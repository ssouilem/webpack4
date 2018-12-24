import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getToken = () => cookies.get('access_token')
const getRefreshToken = () => cookies.get('refresh_token')

const getUserId = () => cookies.get('userId')
const getOrganizationId = () => cookies.get('organizationId')

const logout = () => {
  cookies.remove('access_token')
  cookies.remove('refresh_token')
  cookies.remove('organizationId')
  cookies.remove('userId')
}

const saveToken = (data, time) => {
  cookies.set('access_token', data.access_token,
    { path: '/',
      maxAge: time,
      token: data.access_token,
      // secure: __PROD__,
      httpOnly: false,
    })

  cookies.set('refresh_token', data.refresh_token,
    { path: '/',
      maxAge: time + 3600,
      // secure: __PROD__,
      httpOnly: false,
    })
}

const saveUserId = (userId) => {
  cookies.set('userId', userId, {
    // secure: __PROD__,
    httpOnly: false,
  })
}

const saveOrganizationId = (companyId) => {
  cookies.set('organizationId', companyId, {
    // secure: __PROD__,
    httpOnly: false,
  })
}

export default {
  cookies,
  getToken,
  logout,
  saveToken,
  saveUserId,
  saveOrganizationId,
  getUserId,
  getOrganizationId,
  getRefreshToken,
}
