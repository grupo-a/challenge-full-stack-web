SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


ALTER SCHEMA public OWNER TO postgres;

COMMENT ON SCHEMA public IS 'standard public schema';

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.students (
    id bigint DEFAULT nextval('public.students_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    ra character varying(10) NOT NULL,
    cpf character varying(11) NOT NULL,
    "createdAt" timestamp(0) without time zone,
    "updatedAt" timestamp(0) without time zone
);


ALTER TABLE public.students OWNER TO postgres;

INSERT INTO public.students VALUES (408, 'Ágata Tolfano', 'samuelsrensdatter@gmail.com', '7155713298', '87875370108', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (409, 'Nicolas Zuchi', 'elisafriggi@gmail.com', '8333059490', '77961168290', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (410, 'Ana Pedersen', 'rebecalamha@gmail.com', '6216304354', '14360169590', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (411, 'Fernando Rio', 'dborabuzatto@gmail.com', '1156933758', '75104030733', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (412, 'Nicolas Dinis', 'fredericopessali@gmail.com', '8383818976', '25381869606', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (413, 'Cristiano Roriz', 'micaelamello@gmail.com', '937316887', '17126782306', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (414, 'Alice Geraldo', 'murilolucca@gmail.com', '7946388195', '22480654770', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (415, 'Felipe Gasparini', 'natliapaoliello@gmail.com', '875300973', '36906040529', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (416, 'João Dalcin', 'joonogueira@gmail.com', '4148030144', '52262432945', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (417, 'Miguel Lorenzon', 'raulpolesel@gmail.com', '1609677784', '00243763026', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (418, 'Maria Segrini', 'heitordemendona@gmail.com', '3741973643', '11156241642', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (419, 'Brenda Christiansen', 'auroralemos@gmail.com', '7539295258', '88671234169', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (420, 'Ivan Ronqueti', 'samueldemartins@gmail.com', '6051219444', '51994199784', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (421, 'Maria Lagoeiro', 'calebewatanabe@gmail.com', '5785370646', '70489896294', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (422, 'Júlia Conte', 'fernandaormo@gmail.com', '3232593179', '33782396979', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (423, 'Ariela Dias', 'enzohabib@gmail.com', '6605975542', '22852251990', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (424, 'Hugo Darroz', 'helenaespritosanto@gmail.com', '743460512', '92978628618', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (425, 'Yasmine Fernandez', 'pietrohyplito@gmail.com', '3603930638', '61242991190', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (426, 'Eduardo Wandermurem', 'leonardocgo@gmail.com', '2281570665', '20425622622', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (427, 'Luiza de Zan', 'lucaszamparoni@gmail.com', '8312651222', '47437431416', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (428, 'Diana Villares', 'dboralopes@gmail.com', '6184830606', '53503035460', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (429, 'Jonas Peppelenbos', 'helenazoppi@gmail.com', '7751780964', '41490577459', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (430, 'Ana Stebenne', 'leonardocosta@gmail.com', '973406974', '85332511736', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (431, 'Carlos Matsuschita', 'carolinalanes@gmail.com', '103758429', '32694824773', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (432, 'Clarisse Majeveski', 'michaelroza@gmail.com', '4182889109', '13422852557', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (433, 'Cauã Bruno', 'lorenzoprati@gmail.com', '9622540821', '24172411614', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (434, 'Danilo Ronqueti', 'jliapianessolil@gmail.com', '8818009268', '90085934160', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (435, 'David Moura', 'cauperlatti@gmail.com', '8463240282', '18826194980', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (436, 'Marcela Monteiro', 'micaeladenadai@gmail.com', '9905626081', '17171052460', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (437, 'Isadora Antonia', 'beatrizteves@gmail.com', '3958567535', '93821393700', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (438, 'Alexandre Orelio', 'leandrobourguignon@gmail.com', '7953951548', '83947112602', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (439, 'Olívia Dassié', 'henriquepeterli@gmail.com', '3853345566', '41782957308', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (440, 'Álvaro Darroz', 'nicolascavallina@gmail.com', '4684183526', '10187852219', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (441, 'Heitor Barreira', 'miguelambrosio@gmail.com', '4766380186', '68057481781', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (442, 'Guilherme Sperotto', 'rebecaoliveira@gmail.com', '2981657891', '15423948304', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (443, 'Joaquim Tessaro', 'viniciosmartin@gmail.com', '5638620960', '85193303471', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (444, 'Marcos Benedetti', 'luisaugustsdatter@gmail.com', '7482770145', '06772668391', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (445, 'Davi Laures', 'kelvinnascimento@gmail.com', '9116293603', '78930265537', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (446, 'Agatha Christophersen', 'alanfardin@gmail.com', '501706557', '94141383660', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (447, 'Eduarda Cunha', 'karenstradiotto@gmail.com', '1286080925', '55601284148', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (448, 'Juliano Maroto', 'helosamaroto@gmail.com', '6536294147', '61588610225', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (449, 'Emanuelly Vinco', 'matheusalmeida@gmail.com', '8495776202', '23113749905', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (451, 'Laila Fuzeti', 'mariacardoso@gmail.com', '4883253241', '60230812740', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (452, 'Rodrigo Nagem', 'heitorloureno@gmail.com', '3552043014', '80041759885', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (453, 'Carol de Aguiar', 'lourenoarajo@gmail.com', '7160481941', '32488628409', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (454, 'Joana Cola', 'auroradefreitas@gmail.com', '5463836423', '39036714109', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (455, 'Rafael de Palma', 'arianapase@gmail.com', '4376815707', '25649914753', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (456, 'Vitória Faria', 'viniciosdeolivena@gmail.com', '7339956823', '71798529025', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (457, 'Lorena Mosso', 'jliamilanez@gmail.com', '7860350891', '20252699432', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (458, 'Nicole Fabro', 'mateusronqueti@gmail.com', '6487760729', '63696377775', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (459, 'Rodrigo Zavarise', 'flviobusato@gmail.com', '4926795295', '37835189895', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (460, 'Fernanda Cravellar', 'beatrizmaida@gmail.com', '4023981411', '93644435278', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (461, 'Bruna Maremiori', 'marcobarros@gmail.com', '9546326705', '50569355656', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (462, 'Fernanda Gardiman', 'mariacittera@gmail.com', '7617056084', '00020361343', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (463, 'Lavínia Fuzeti', 'jorgefalquetto@gmail.com', '8604002784', '51955943761', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (464, 'Frederico Maifredi', 'raulcuritiba@gmail.com', '368036696', '69871874529', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (465, 'Alice Curcio', 'heitordestefani@gmail.com', '5955933885', '54609091801', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (466, 'Felipe Dias', 'clarisseminet@gmail.com', '9498498496', '99337117258', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (467, 'Isaac da Rosa', 'brunosales@gmail.com', '4065751541', '24980315534', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (468, 'Rafaela Grasseto', 'fernandapasti@gmail.com', '4134165620', '83455044930', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (469, 'Lívia Laurenco', 'brunobottega@gmail.com', '98765569', '30010333207', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (470, 'Pedro Fagundes', 'anaformigoni@gmail.com', '4648839670', '47507412482', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (471, 'Juliana Pase', 'caubotti@gmail.com', '8635525589', '59438820221', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (472, 'Emanuel Oliveira', 'emanuelgobbato@gmail.com', '6892335389', '37578917161', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (473, 'Lorenzo Meneses', 'marcokristiansen@gmail.com', '4818310301', '92617064603', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (450, 'João Abreu 2', 'iancrozatti@gmail.com', '8045971187', '47509076420', '2021-02-01 03:44:23', '2021-02-04 23:09:41');
INSERT INTO public.students VALUES (474, 'Beatriz Kister', 'melissato@gmail.com', '8086232077', '85530642713', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (475, 'Afonso Francisco', 'henriquemariane@gmail.com', '6897859881', '20021579440', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (476, 'Natália Alexandreli', 'pedrofioravante@gmail.com', '7312737967', '75458286405', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (477, 'Adriano Medeiros', 'julianaalenquer@gmail.com', '9290499898', '41831433303', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (478, 'Íris Bernardi', 'alexandredejesus@gmail.com', '4645604876', '83093015618', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (479, 'Lívia Colli', 'gustavoloreto@gmail.com', '9458649023', '39286947747', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (480, 'Giovana Thomaz', 'otviomeneguete@gmail.com', '9766519671', '34702173782', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (481, 'Manuel Rochite', 'octviosossai@gmail.com', '6309062613', '97319421224', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (482, 'Carolina Della Libera', 'masacecotti@gmail.com', '3419174213', '38217668329', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (483, 'Kelly Jambo', 'davidegois@gmail.com', '3589305595', '59572209655', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (484, 'Aquiles Réboli', 'isabelakechi@gmail.com', '8853634231', '60259837806', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (485, 'Emanuel Aggrizzi', 'renandeandrade@gmail.com', '2468923753', '10951456490', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (486, 'Lucca Abaine', 'benjamimzucatelli@gmail.com', '2054676993', '95567628331', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (487, 'Wilian Tozzi', 'luismiranda@gmail.com', '7001374980', '16273326428', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (488, 'Lorena Rizenente', 'joodibarrel@gmail.com', '4956172293', '51698812310', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (489, 'Clarissa Guerini', 'mariafontes@gmail.com', '5848338337', '50493195106', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (490, 'Eduardo Vescovi', 'laracaprini@gmail.com', '862346532', '70296895342', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (491, 'Emanuel Nicoli', 'carolgrandpre@gmail.com', '4148082335', '87238135639', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (492, 'Miguel Pazeto', 'natliavasconcelos@gmail.com', '222740394', '80250630460', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (493, 'Mateus Destéfani', 'ricardosangalli@gmail.com', '7799005145', '84079072350', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (494, 'Ariela Sa', 'jliomaremiori@gmail.com', '5347439652', '35604762407', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (495, 'Talita Caldeira', 'helenazerbone@gmail.com', '7057020074', '47556662012', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (496, 'Joana do Espírito Santo', 'pedroclaudino@gmail.com', '7285419242', '10646079859', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (497, 'Bárbara Uliana', 'rodrigoporto@gmail.com', '4596827383', '13308508907', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (498, 'Alexandre Berard Lepine', 'gabrielabicudo@gmail.com', '5006938667', '13425376535', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (499, 'Alana Bourguignon', 'jliagasparotto@gmail.com', '1049517580', '16772958136', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (500, 'João Araújo', 'martimdepaula@gmail.com', '3670913627', '55807955137', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (501, 'Jade Agrizi', 'tiagopremero@gmail.com', '7027580887', '28659752660', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (502, 'Julia Moura Filho', 'brunaferlin@gmail.com', '7833693177', '69736704823', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (503, 'Pedro Busetti', 'cristianoalto@gmail.com', '744297126', '86110328294', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (504, 'Juliana Garcia', 'anacostariol@gmail.com', '4471150199', '83590668504', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (505, 'Joaquim Ceolin', 'valentimmergr@gmail.com', '8891155239', '61205969250', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (506, 'Júlio Minet', 'paulos@gmail.com', '8963565050', '26334282077', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (507, 'Isa Teles', 'renatoperreyra@gmail.com', '6021229822', '02985344360', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (508, 'Isabel Speranza', 'joofardin@gmail.com', '7489157394', '48599079220', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (509, 'Jonathan Mafra', 'luismenegardo@gmail.com', '2782306221', '79117432405', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (510, 'Laila Miller', 'isispontes@gmail.com', '7434367323', '36598440475', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (511, 'Valentina Penna', 'gustavozavarize@gmail.com', '5153458051', '42995255310', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (512, 'Melissa Barbosa', 'marcelapillon@gmail.com', '2805237367', '92914749830', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (513, 'Maitê Villela', 'joanaballarini@gmail.com', '4036692826', '07047675035', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (514, 'Daniela Luis', 'vitriapuppim@gmail.com', '2552947752', '57051307835', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (515, 'Isabella Ferreira', 'davicarrio@gmail.com', '3275122969', '56496272158', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (516, 'Clarissa Patricio', 'marianaalmeida@gmail.com', '6811229739', '38734957596', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (517, 'Clara Herzog', 'jessicaantunes@gmail.com', '2711684088', '51653516534', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (518, 'Rafaela Cola', 'melissabinelledepietro@gmail.com', '5826569408', '25007068691', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (519, 'Lis Sgario', 'gabrieljoao@gmail.com', '4985961010', '15083438453', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (520, 'Ângelo Barboza', 'alineherculano@gmail.com', '9907688298', '41860792693', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (521, 'Vitória Rizzo', 'isadoranascimento@gmail.com', '2953276216', '31578619050', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (522, 'Pamela do Bonfim', 'masavetorazzi@gmail.com', '5714341924', '36642155084', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (523, 'Ricardo Dalla Betta Berta', 'helosadosacramento@gmail.com', '7207578624', '04826035691', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (524, 'Bryan Rodrigues', 'larasimonato@gmail.com', '7890856094', '75108395051', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (525, 'Sophia Taylor', 'vitriamascarello@gmail.com', '906102163', '65259724500', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (526, 'Nicole Milanezi', 'michaelperuchi@gmail.com', '2778332579', '98486886929', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (527, 'Tiago Larsen', 'anaparente@gmail.com', '6212475241', '71393630138', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (528, 'Cloe Pancot', 'isadoralyrio@gmail.com', '3722960352', '42628184036', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (529, 'Rebeca Mendes', 'iarafitipaldi@gmail.com', '522872702', '42813082708', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (530, 'Melissa do Espírito Santo', 'fbiomathisen@gmail.com', '4000898480', '66805344611', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (531, 'Theo Premoli', 'lviaronqueti@gmail.com', '1193723453', '36369596540', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (532, 'Felipe Légora ', 'jademastrantoni@gmail.com', '1117903280', '98565601790', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (533, 'Bruno Sartório', 'valentinachristensen@gmail.com', '820117625', '57315555757', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (534, 'Vitória Bonilha', 'lvarohostey@gmail.com', '2401564158', '19337802902', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (535, 'Brenda Contarini', 'anachagas@gmail.com', '2002319729', '17114529635', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (536, 'Eduardo Cecote', 'marinacarvalho@gmail.com', '1808953585', '26918592742', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (537, 'Leonardo Pereira', 'anabelaogura@gmail.com', '8514479590', '01573243035', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (538, 'Heitor Gomes', 'wilianlima@gmail.com', '2692791242', '15731173745', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (539, 'Pablo Silva', 'cecliaarajo@gmail.com', '9749840578', '26351785855', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (540, 'Caio Puppim', 'jossipolatti@gmail.com', '5187195301', '21791062709', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (541, 'Gabriela Machado', 'nicolemikkelsen@gmail.com', '9691027457', '00543926753', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (542, 'Aarã Scott', 'emanuellecaliari@gmail.com', '5457859433', '70402995180', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (543, 'Luana Viale', 'manuelbachetti@gmail.com', '3753099391', '12477469681', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (544, 'Maria Paixão', 'diogolizabo@gmail.com', '2269969518', '48045570164', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (545, 'Leonardo Valiate', 'julianolorenzon@gmail.com', '9725561012', '40655801618', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (546, 'Fernanda Palermo', 'clarissalepine@gmail.com', '1716540666', '66362318587', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (547, 'Enzo Frade', 'enzobarrazzuol@gmail.com', '8669815712', '79692658716', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (548, 'Miguel Dal Bo', 'biancaandreasdatter@gmail.com', '5808259132', '06235927460', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (549, 'Duarte Gasparotto', 'santiagomoniz@gmail.com', '7505193292', '93614308316', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (550, 'Matheus Scalpelli', 'antniostrabelli@gmail.com', '4319643807', '28795816720', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (551, 'Anderson Fernandes', 'daviddonald@gmail.com', '750799769', '03276417979', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (552, 'Davi Botti', 'fernandamenezes@gmail.com', '2885423949', '23534255003', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (553, 'Muriel Marchiori', 'lorenapedroza@gmail.com', '739441642', '98865566175', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (554, 'Raul Vida', 'lorenadagostini@gmail.com', '3373571412', '48517885767', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (555, 'Isabella Oinhos', 'talitacatellan@gmail.com', '6702570416', '11501884646', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (556, 'Cloe Pierri', 'thiagorago@gmail.com', '2527237611', '94260014927', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (557, 'Valentim Reis', 'alciamilaneze@gmail.com', '1403504231', '27897306100', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (558, 'Gabriela Ambrozim', 'clarissabedore@gmail.com', '8630021260', '77270845301', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (559, 'Augusto Galavotti', 'agathabozi@gmail.com', '4782129195', '41320089917', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (560, 'Nicole Filete', 'arturjesus@gmail.com', '3579057869', '54163283048', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (561, 'Gustavo de Arajuo', 'melissadalvi@gmail.com', '5414407037', '70571900933', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (562, 'Julia Airoso', 'yasminrigotto@gmail.com', '1157365927', '76762145809', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (563, 'Calebe Dalvi', 'martimlucchetta@gmail.com', '9870941165', '07872000423', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (564, 'Isabella Bragagnolo', 'viniciusesmria@gmail.com', '6792521295', '98645140322', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (565, 'Camila Altoé', 'luizadelli@gmail.com', '3621608249', '84303259217', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (566, 'Marcela Cavaleiro', 'alexanderfim@gmail.com', '9935950325', '50052446204', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (567, 'Ariela Demartins', 'augustomeger@gmail.com', '8309480231', '39716699131', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (568, 'Douglas Julio', 'emanuellerossi@gmail.com', '283336407', '94905318394', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (569, 'Lourenço Henriques', 'dboraervati@gmail.com', '6401101476', '76777579010', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (570, 'Gabriel Vasconcelos', 'isadoradeavila@gmail.com', '5932083650', '65123564977', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (571, 'Natália Colombi', 'samuelgaiotto@gmail.com', '1810421573', '52565110847', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (572, 'Muriel Souza', 'raquelzancanela@gmail.com', '7175262528', '76161779480', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (573, 'Maitê Pazeto', 'murielpillon@gmail.com', '9719866979', '04712623829', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (574, 'Nicole Alvarenga', 'ricardocampors@gmail.com', '3508167409', '81496976320', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (575, 'Melissa Donato', 'isabellamasut@gmail.com', '7517928160', '61634208374', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (576, 'Aurora Antonia', 'alexandrebortoloti@gmail.com', '5486252593', '55782234350', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (577, 'Larissa Amim', 'heitorzanoni@gmail.com', '2113271025', '92738370420', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (578, 'Davi Selvatici', 'leviperreyra@gmail.com', '5871995613', '62126800008', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (579, 'Paulo Vargas', 'mariadagloria@gmail.com', '2170324606', '92645590861', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (580, 'Murilo Zanichelli', 'lvaroballarini@gmail.com', '5157318520', '70434425320', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (581, 'Amanda Rúbia', 'brendadenadai@gmail.com', '363551344', '73588108726', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (582, 'Isis Vadagnin', 'lauranelson@gmail.com', '2171080508', '91195090307', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (583, 'Luana Esposito', 'luccamergr@gmail.com', '2955732450', '96354808651', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (584, 'Esther Knudsen', 'olviagrandpre@gmail.com', '7118329736', '54541728044', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (585, 'Muriel Catabriga', 'lviazavarise@gmail.com', '939602586', '17640138671', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (586, 'Lucas Ventura', 'yaranicoli@gmail.com', '2994449392', '24317743094', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (587, 'Tomás Vanzan', 'helosapolinini@gmail.com', '6073186316', '67946844620', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (588, 'Agatha Grobério', 'brbaraladeira@gmail.com', '5917839177', '21304136922', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (589, 'Lorena Busato', 'lorenzomiranda@gmail.com', '2937905936', '41689909153', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (590, 'Carlos Lemos', 'joodealmada@gmail.com', '6977883624', '57297691488', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (591, 'Rafael Netto', 'jooantunes@gmail.com', '4459886822', '46128355579', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (592, 'Iara Rodrigues', 'sophiathomaz@gmail.com', '4006617523', '34531140940', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (593, 'Sofia Tedoldi', 'rafaelavanzan@gmail.com', '6444130315', '16678727029', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (594, 'Fernanda Santos', 'saraloreto@gmail.com', '8498327821', '17818702687', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (595, 'Nicolas Barrazzuol', 'arielaneto@gmail.com', '4195599210', '85351644304', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (596, 'Kelvin Ferlin', 'anitacescon@gmail.com', '2441973821', '88737440012', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (597, 'Fábio Arrivabene', 'gabrieltozi@gmail.com', '6993488947', '15958689509', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (598, 'João Ferrarese', 'kellylaus@gmail.com', '674266087', '33591704156', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (599, 'Ana Pravato', 'guilhermesantori@gmail.com', '4192351142', '53215015803', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (600, 'Danilo do Sacramento', 'abigailjorge@gmail.com', '5852915018', '65596188034', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (601, 'Íris Malta', 'lisostitty@gmail.com', '8957116709', '71011397790', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (602, 'Clarisse Nassar', 'helenasantos@gmail.com', '6576827610', '92288275995', '2021-02-01 03:44:23', '2021-02-01 03:44:23');
INSERT INTO public.students VALUES (603, 'Matheus Faco', 'yasminegomes@gmail.com', '5688072345', '71594025371', '2021-02-01 03:44:23', '2021-02-01 03:44:23');

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.users_id_seq OWNER TO postgres;

CREATE TABLE public.users (
    id bigint DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(100) NOT NULL,
    "createdAt" timestamp(0) without time zone,
    "updatedAt" timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

INSERT INTO public.users VALUES (1, 'Admin', 'api@challenge.com', '$2b$10$tERUPKO2gZzqqchgYnMAFueApfrtDuajfOQ5e7I/w.wztSNSR6dxW', 'admin', '2021-02-02 00:13:48', '2021-02-02 00:13:48');

SELECT pg_catalog.setval('public.students_id_seq', 701, true);

SELECT pg_catalog.setval('public.users_id_seq', 1, true);

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_un UNIQUE (ra);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un UNIQUE (email, username);