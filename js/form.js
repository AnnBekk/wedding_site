const completedForm = document.getElementById('form');
completedForm.addEventListener('submit', handleFormSubmit);
 
async function handleFormSubmit(event) {
    event.preventDefault();
    const data = serializeForm(form.elements);
    const response = await sendData(data);
    console.log(response);
  }
  

function serializeForm(elements) {
    let element, name, commonName, insObj, value;

    let obj = {};
    for (let i = 0; i < elements.length; i++) {
        element = elements[i];
        name = element.name;
        if (name) {
            if (element.type === 'radio' || element.type === 'checkbox') {
                commonName = name;
                insObj = {};
                while (name === commonName) {
                    insObj[element.value] = element.checked;
                    i++;
                    element = elements[i];
                    name = element.name;
                }
                obj[commonName] = insObj;
                i--;
            } else {
                obj[name] = element.value;    
            }
            }
        }
    return JSON.stringify(obj);
} 

async function sendData(data) {
    return await fetch('http://deu.kottur.net:8100/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
}