export default function (tipoHeader) {
  switch (tipoHeader) {
    case 'WITHOUT_USER_TOKEN': {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      return headers
    }
    case 'WITH_USER_TOKEN': {
      const token = window.sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      }

      return headers
    }    
    default:
      return {}
  }
}
