// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

describe('test the whole oauth2 workflow', () => {
    test('correctly create new integration after complete workflow', async () => {
        let response = await 
            .get('/auth')
            .query({ user: 'tester@test.com', oauth: 'testoauth2'})
            .set('Authorization', `${token}`)
            .expect(302)

        let cookies = response.headers['set-cookie']

        // we need to try/catch the call to get the correct callback url with the code
        try {
            response = await axios
                .get(response.headers.location, {
                    headers: {
                        Cookie: response.headers['set-cookie']
                    }})
        } catch (e) {
            expect(e.request.path).toContain('authcallback')
           
            response = await api
                .get(e.request.path)
                .set("Cookie", cookies)
                .set('Authorization', `${token}`)
                .expect(200)
        }

        let integration = await api
            .get('/integration')
            .set('Authorization', `${token}`)
            .query({channel: 'testoauth2'})
            .expect(200)

        expect(integration.text.channel).toBe('testoauth2')
    })
})
*/

describe('test the authorization workflow', () => {
    let response = await
    fetch(`http://localhost:8000/oauth/authorize?code_challenge=${code_challenge}&state=${state}`)
})
//test availability of users to interact with buttons
<button data-testid="button" type="submit" disabled>submit</button>
<fieldset disabled><input type="text" data-testid="input" /></fieldset>
<a href="..." disabled>link</a>

expect(getByTestId('button')).toBeDisabled()
expect(getByTestId('input')).toBeDisabled()
expect(getByText('link')).not.toBeDisabled()
