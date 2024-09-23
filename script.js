document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const formStartTime = new Date().getTime();
    document.getElementById('formStartTime').value = formStartTime;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        if (formData.get("botcheck")) {
            formMessage.innerHTML = "Spam detected. Form not submitted.";
            return;
        }

        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - formStartTime) / 1000;
        if (elapsedTime < 10) {
            formMessage.innerHTML = "Form submitted too quickly. Please try again.";
            return;
        }

        formMessage.innerHTML = "Sending message, please wait...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.innerHTML = "Thank you for your message! We'll get back to you soon.";
                form.reset();
                setTimeout(() => {
                    formMessage.innerHTML = "";
                }, 3000);

            } else {
                formMessage.innerHTML = `Error: ${result.message}`;
            }
        } catch (error) {
            formMessage.innerHTML = "There was a problem submitting the form. Please try again.";
        }
    });
});
