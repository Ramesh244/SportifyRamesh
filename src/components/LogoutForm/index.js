import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const LogoutForm = () => {
  const {history} = this.props
  // const token = this.getAccessToken()
  Cookies.remove('pa_token')

  history.replace('/login')
}
export default withRouter(LogoutForm)
