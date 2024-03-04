const bd = require("../../config/dataBase");
const sha256 = require('sha256');

const list = () => {
  return new Promise(async (resolve, reject) => {

    await bd.query("BEGIN");

    await bd.query(`SELECT  A.id_user                    AS "idUser",
                            C.id_student                 AS "idStudent",
                            C.id_ra                      AS "idRa",
                            D.id_educational_institution AS "idEducationalInstitution",
                            E.description                AS "educationalInstitution",
                            D.ra                         AS "ra",
                            A.id_user_type               AS "idUserType",
                            B.description                AS "userType",
                            A.name                       AS "name",
                            A.email                      AS "email",
                            A.phonenumber                AS "phoneNumber",
                            A.cpf                        AS "cpf",
                            A.active                     AS "active"	   
                            FROM tb_user A
                          JOIN tb_description_content B
                            ON A.id_user_type = B.id_table_description_content 
                          LEFT JOIN tb_student C	
                            ON A.id_user = C.id_user
                          LEFT JOIN tb_ra_educational_institution D
                            ON C.id_ra = D.id_ra_educational_institution
                          LEFT JOIN tb_educational_institution E	
                            ON D.id_educational_institution = E.id_educational_institution`)
      .then(async (r) => {

        await bd.query("COMMIT");
        resolve(r.rows);

      })
      .catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao listar os Usuários/Alunos! Detalhamento: ${e.message}`);

      });
  });
};

const listByIdUser = (idUser) => {
  return new Promise(async (resolve, reject) => {


    await bd.query("BEGIN");

    await bd.query(`SELECT  A.id_user                    AS "idUser",
                            C.id_student                 AS "idStudent",
                            C.id_ra                      AS "idRa",
                            D.id_educational_institution AS "idEducationalInstitution",
                            E.description                AS "educationalInstitution",
                            D.ra                         AS "ra",
                            A.id_user_type               AS "idUserType",
                            B.description                AS "userType",
                            A.name                       AS "name",
                            A.email                      AS "email",
                            A.phonenumber                AS "phoneNumber",
                            A.cpf                        AS "cpf",
                            A.active                     AS "active"	   
                            FROM tb_user A
                          JOIN tb_description_content B
                            ON A.id_user_type = B.id_table_description_content 
                          LEFT JOIN tb_student C	
                            ON A.id_user = C.id_user
                          LEFT JOIN tb_ra_educational_institution D
                            ON C.id_ra = D.id_ra_educational_institution
                          LEFT JOIN tb_educational_institution E	
                            ON D.id_educational_institution = E.id_educational_institution
                            WHERE A.id_user = $1`, [idUser])
      .then(async (r) => {

        await bd.query("COMMIT");
        resolve(r.rows[0]);

      }).catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao listar o Usuário/Aluno! Detalhamento: ${e.message}`);

      });
  });
};

const include = (body) => {
  return new Promise(async (resolve, reject) => {

    let password = sha256(body.email + body.cpf);
    

    await bd.query("BEGIN");

    await bd.query(`INSERT INTO tb_user(id_user_type, password, name, email, phonenumber, cpf, active)
                                 VALUES($1, $2, $3, $4, $5, $6, $7)
                                 RETURNING id_user AS "idUser"`,
      [body.idUserType, password.toLocaleUpperCase(), body.name, body.email, body.phoneNumber, body.cpf, body.active])
      .then(async (r) => {

        if (body.idUserType == 2) {

          const raEducationalInstitution = await bd.query(`INSERT INTO public.tb_ra_educational_institution(id_educational_institution, ra)
                                                          VALUES($1, $2)
                                                          RETURNING id_ra_educational_institution AS "idRa"`,
            [body.idEducationalInstitution, body.ra]);

          const student = await bd.query(`INSERT INTO tb_student( id_user, id_ra)
                                          values($1, $2)
                                          RETURNING *`,
            [r.rows[0].idUser, raEducationalInstitution.rows[0].idRa]);

        }

        const newUser = await listByIdUser(r.rows[0].idUser);

        await bd.query("COMMIT");
        resolve(newUser);

      })
      .catch(async (e) => {

        await bd.query("ROLLBACK");

        if (e.message.includes('tb_ra_educational_institution_unique_index')) {
          e.message = "já existe esse RA cadastrado para essa Instituição de ensino, favor procurar o administrador do sistema."
        }

        reject(`Ocorreu um erro ao incluir o Usuários/Alunos! Detalhamento: ${e.message}`);

      });

  });
};

const deleteUser = (idUser) => {

  return new Promise(async (resolve, reject) => {

    await bd.query("BEGIN");

    await bd.query(`DELETE FROM tb_student WHERE id_user = $1`, [idUser])
      .then(async (r) => {

        await bd.query(`DELETE FROM tb_permission WHERE id_user = $1`, [idUser]);

        await bd.query(`DELETE FROM tb_user WHERE id_user = $1`, [idUser]);

        await bd.query("COMMIT");

        resolve(r.rows);

      })
      .catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao excluir o Usuário/Aluno! Detalhamento: ${e.message}`);

      });

  });
};

const alterUser = (idUser, body) => {

  return new Promise(async (resolve, reject) => {

    await bd.query("BEGIN");

    await bd.query(`UPDATE tb_user SET                
                                    name                  = $2,
                                    email                 = $3,
                                    phonenumber           = $4,
                                    active                = $5
                                WHERE id_user             = $1`,
        [
          idUser,
          body.name,
          body.email,
          body.phoneNumber,
          body.active
        ])

      .then(async (r) => {

        await bd.query("COMMIT");

        const newUser = await listByIdUser(idUser);
        resolve(newUser);

      })

      .catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao excluir o Usuário/Aluno! Detalhamento: ${e.message}`);

      });

  });
};

const educationalInstitutionList = () => {
  return new Promise(async (resolve, reject) => {

    await bd.query("BEGIN");

    await bd.query(`SELECT A.id_educational_institution AS "idEducationalInstitution",
                           A.description                AS "description"	   
                      FROM tb_educational_institution A`)
      .then(async (r) => {

        await bd.query("COMMIT");
        resolve(r.rows);

      })
      .catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao listar as Instituições de Ensino! Detalhamento: ${e.message}`);

      });
  });
};

const typeUserList = () => {
  return new Promise(async (resolve, reject) => {


    await bd.query("BEGIN");

    await bd.query(`SELECT A.id_table_description_content AS "idUserType",
                           A.description                  AS "description"
                          FROM tb_description_content A
                        WHERE A.id_table_description = 1`)
      .then(async (r) => {

        await bd.query("COMMIT");
        resolve(r.rows);

      })
      .catch(async (e) => {

        await bd.query("ROLLBACK");
        reject(`Ocorreu um erro ao listar os Usuários/Alunos! Detalhamento: ${e.message}`);

      });
  });
};

module.exports = {
  list,
  include,
  deleteUser,
  alterUser,
  typeUserList,
  educationalInstitutionList
};
