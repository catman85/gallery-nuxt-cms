<template>
  <div>
    <h1>Contact</h1><br>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact/success/">
      <!-- honeypot bot trap (needs to be hidden)-->
      <!-- ATTENTION The hidden input field should have a name attribute called "form-name" and a value matching the name of the form, which in this case is "contact" -->
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>Email: <input type="text" name="email" required /></label>
      </p>
      <p>
        <label>Message: <textarea name="message" required></textarea></label>
      </p>
      <p>
        <button type=”submit” class="pushy-btn">Send Message</button>
      </p>
    </form>
  </div>
</template>
