const invitationEmail =
    `
<header>
    Hello {{ email }}! Welcome to my project management app
</header>

<section>
    Please click <a href={{link}}>here</a> to sign up your account.
    This link only exits in 3 hours.
</section>
`

module.exports = invitationEmail;