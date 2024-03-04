emailjs.init({
    publicKey: "L-PgheVI3V8xMteO6",
});
$(".contact-form").on('submit',function( event ) {
    event.preventDefault();
    $(".wpcf7-form-msg").text("");
    const formData = new FormData(event.target);
    const full_name = formData.get('Hovaten')
    const phone_number = formData.get('sodienthoai')
    const address = formData.get('diachi')
    const service_name = formData.get('dichvu')
    const content = formData.get('noidung')
    const data = {full_name,phone_number,address,service_name,content}
    if (full_name.length&&phone_number.length) {
      sendEmail(data)
    }else {
      $(".wpcf7-form-msg").text("Vui lòng điền đúng tên và số điện thoại");
      $(".processing").removeClass("processing");
    }
})



function sendEmail({full_name,phone_number,address,service_name,content=""}) {
    emailjs.send("service_2cm7dmf","template_xfe4jbi",{
        full_name: full_name,
        phone_number: phone_number,
        address: address,
        service_name:service_name,
        content:content,
        location: window.location.hostname,
    }).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          $(".processing").removeClass("processing");
          $(".wpcf7-form-msg").text("Đăng ký tư vấn thành công");
          setTimeout(()=>{$(".wpcf7-form-msg").text("")},3000)
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );;
}