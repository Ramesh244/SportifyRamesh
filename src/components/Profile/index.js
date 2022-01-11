import {Component} from 'react'

import Cookies from 'js-cookie'

import LoaderView from '../LoaderView'

import NavBar from '../NavBar'

import './index.css'

class Profile extends Component {
  state = {userData: [], isLoading: true}

  componentDidMount() {
    this.getUserProfileData()
  }

  sessionTimedOut = () => {
    const {history} = this.props
    Cookies.remove('pa_token')
    history.replace('/login')
  }

  onClickLogout = () => {
    Cookies.remove('pa_token')
    const {history} = this.props
    history.replace('/login')
  }

  getUserProfileData = async () => {
    const token = Cookies.get('pa_token')
    const apiUrl = 'https://api.spotify.com/v1/me'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedUserData = {
        displayName: data.display_name,
        country: data.country,
        email: data.email,
        followers: data.followers,
        href: data.href,
        id: data.id,
        images: data.images,
        product: data.product,
        type: data.type,
        uri: data.uri,
      }
      this.setState({userData: updatedUserData, isLoading: false})
    } else {
      this.sessionTimedOut()
    }
  }

  renderProfilePage = () => {
    const {userData} = this.state

    return (
      <div className="profile-container">
        <img
          src="https://lh3.googleusercontent.com/nJ-Zc45_poM9o9002BZGfxJUdqBGBu8nf722fiCQBrCw8_OX9RRui6h-Z-QE3P7PPfZ8_QAelgJd-SiEdH3Pkq0k4OSi51jgyZIDAB7ztrVTEtQQvKHb0Q9kV2NcP8FZJpe8ule2kLbE0QtaDSDMa9XDQEKMulW-nzcXKtxaRLpwMZT9jKoAytdAolnna87HLwat4zyAbcYFBpWVyw0yD0DM3EhcO2zyoutD4GIG4oxIdgCrDekDpQn4UYsA4-6kAdxVBXCvRnu6Kznr9M4PRcnpVIoHmXj8KHQNq84fZN-FKD2z4P_7HtzApRkTlEuFg4PQJHGeV2rDNnCCxHbwa3dl8NE4tXUn3BC_tRAJZWHnTUetDY-I1hf7mTK0KrgPc3TyrQuH7P6td6LZfFECohRsNI70OhRKJz4ZjTUmAXMNsLLxjPOHkwm_E3q-OKPJd28Ab3oZAmES-gbA1FaxmPNz0OUmqe8LPOEyPgQ709SJ-uNwfEkHiRpIfG4VHSfRCbtw0i7d-BAAOshVQ5LdMp11KrbjneEStCJAeyzvdW56YttF7chEj1r65O8YyUImXnuY-hxdkKq6qvy0QRfPrwjQOtr1g9LhI0HoafE1bOMD18MQcVwUxL56liec6hATMZCkxBJ7jvRJdZdltmVkEMVt4qzmKWeRDsXFItnFdp3TTJx58nWYRWN7iKXKf6quUxOoGEUbxfqTKPfyxurO3fM=w413-h531-no?authuser=0"
          alt="avatar"
          className="user-icon"
        />
        <h1 className="user-name">{userData.displayName}</h1>
        <div className="followers-playlists-info-container">
          <div className="followers-playlists-div">
            <p className="followers-playlists-info">15</p>
            <p className="followers-playlists-info-text">FOLLOWERS</p>
          </div>
          <div className="followers-playlists-div">
            <p className="followers-playlists-info">25</p>
            <p className="followers-playlists-info-text">PLAYLISTS</p>
          </div>
        </div>
        <button
          type="button"
          onClick={this.onClickLogout}
          className="logout-button"
        >
          LOGOUT
        </button>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <NavBar />
        {isLoading ? <LoaderView /> : this.renderProfilePage()}
      </>
    )
  }
}

export default Profile
