// const showAlert = () => {

// };

const fetchData = () =>
  fetch('https://24.javascript.pages.academy/keksobooking/data1')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        //showAlert();
        //alert('not today, mate');
      }
    //.catch()
    });

export {fetchData};
