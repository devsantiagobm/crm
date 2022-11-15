export default function useValidation() {

    function validateForm(event) {
        const data = Object.fromEntries(new FormData(event.currentTarget))
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const wrongData = Object.entries(data)
            .filter(([key, value]) => key === "email" ? !value.match(regexEmail) : value === "")
            .map(([key]) => key)

        return [wrongData.length <= 0, wrongData]

    }

    return [validateForm]
}