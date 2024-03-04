import { isEmpty, isEqual, findIndex, forEach, orderBy } from "lodash";

export default( { app }, inject ) =>{

    inject( "isEmpty", ( elemento ) => isEmpty( elemento ) );
    inject( "isEqual", ( valor, outroValor ) => isEqual( valor, outroValor ) );
    inject( "findIndex", ( colecao, funcao ) => findIndex( colecao, funcao ) );
    inject( "forEach", ( colecao, funcao ) => forEach( colecao, funcao ) );
    inject( "orderBy", ( colecao, funcao, ordens ) => orderBy( colecao, funcao, ordens ) );

};