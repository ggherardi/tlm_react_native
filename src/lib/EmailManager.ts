import email from 'react-native-email'

export const EmailManager = {
    send: (to: string | string[], subject: string, body: string) => {
        email(to, {
          subject: subject,
          body: body,
          checkCanOpen: true
        }).catch(console.error)      
    }
}