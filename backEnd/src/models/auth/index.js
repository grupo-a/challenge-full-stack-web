const bd = require("../../config/dataBase");
const { replaceAll } = require('../../utils/index');
const jwt = require("jsonwebtoken");

const login = (body) => {
    return new Promise(async (resolve, reject) => {

        const password = await replaceAll(body.password, 'SELECT+/|\*-"$/?!&()_%#!', "").toUpperCase();

        await bd.query(`SELECT id_user      AS "idUser",
                               id_user_type AS "idUserType",
                               email        AS "email",
                               name         AS "name",
                               password     AS "password",
                               active       AS "active"
                            FROM tb_user 
                            WHERE email = $1`,
            [body.email])
            .then((r) => {

                let key = String(password)
                let token = null
                let objRetorno = {};
                if (r.rowCount > 0) {
                    if (r.rows[0]?.password == key.toUpperCase() && r.rows[0]?.active == true) {
                        token = jwt.sign({
                            idUser: r.rows[0].idUser,
                            name: r.rows[0].name,
                            email: r.rows[0].email,
                        },
                            process.env.SECRET_KEY,
                            { expiresIn: 86400 }
                        );

                        objRetorno = { logon: true, token: token, idUserType: r.rows[0].idUserType }
                        resolve(objRetorno);

                    } else if (r.rows[0]?.password == key.toUpperCase() && r.rows[0]?.active == false) {

                        throw new Error('Usuário se encontra bloqueado.');

                    } else if (r.rows[0]?.password != key.toUpperCase() && r.rows[0]?.active == true) {

                        throw new Error('Senha incorreta');

                    } else if (r.rows[0]?.password != key.toUpperCase() && r.rows[0]?.active == false) {

                        throw new Error('Senha incorreta e usúario bloqueado');

                    } else {

                        throw new Error('Procure o suporte');

                    }
                } else {

                    throw new Error('Não foi encontrado usúario com o e-mail informado!');

                }

            })
            .catch((e) => {

                reject(`Ocorreu um erro ao tentar efetuar o login! Detalhamento: ${e.message}`);

            });

    });
};



const authEndPoint = async (body) => {
    return new Promise(async (resolve, reject) => {

        const method = await bd.query(`SELECT   id_table_description_content as "idMethod",
                                                description                  as "method"
                                            FROM tb_description_content
                                        WHERE id_table_description = 2
                                        AND complement= $1`,
            [body.method]).catch((e) => {

                reject(`ocorreu um erro ao buscar o método na tabela descritiva :${e.message}`);

            });

        await bd.query(`SELECT id_route as "idRoute",
                                             active 
                                        FROM tb_route
                                        WHERE id_method_type = $2
                                        and route = $1 `,
            [body.endPoint, method.rows[0].idMethod])
            .then(async (r) => {

                if (r.rows[0]?.active == true) {


                    const permission = await bd.query(`SELECT id_permission AS "idPermission"
                                                        FROM tb_permission
                                                        WHERE id_user = $1
                                                        AND id_route = $2`,
                        [body.idUser, r.rows[0].idRoute]).catch((e) => {

                            reject('Ocorreu um erro ao buscar a permissão para esse usúario e rota!');

                        });

                    if (permission.rowCount > 0) {

                        resolve(true);

                    } else {

                        reject('Usuário não tem permissão nessa rota.');

                    }

                }  else {

                    reject('Rota inativa ou inexistente.');

                }

            })
            .catch((e) => {

                reject(`Ocorreu um erro ao verificar a permissão de acesso a rota! Detalhamento: ${e.message}`);

            });

    });
};

module.exports = {
    login,
    authEndPoint
};
