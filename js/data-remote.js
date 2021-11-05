const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top ='0';
  alertContainer.style.width = '100%';
  alertContainer.style.padding = '5px 5px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'rgba(223, 66, 44, 1)';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(()=>{
    alertContainer.remove();
  }, 5000);
};

const fetchData = () =>
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Произошла ошибка. Перезагрузите страницу.');}
    })
    .catch(()=> {
      showAlert('Произошла ошибка. Перезагрузите страницу.');
    });

console.log(fetchData());
export {fetchData};
