
async function displayPrice() {
    try {
        var inputStock = document.getElementById('stock').value.trim();

        var response = await fetch(`http://localhost:3001/${inputStock}/price`);
        console.log("right afer the fetch")

        if (response.ok) {
            console.log("response was ok")
            var data = await response.json();
            console.log(data)
            document.getElementById('stockPrice').textContent = data.price
        }
    } catch (error) {
        console.error(error)

    }

}

export default displayPrice
