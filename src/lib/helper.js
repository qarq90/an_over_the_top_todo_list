export const showCustomToast = (severity, summary, detail, content, toastRef, life) => {
    const options = {
        severity: severity, summary: summary, detail: detail, content: content
    }

    options.life = life

    toastRef.current.show(options)
}

export const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
export const phoneRegex = /^\d{10}$/