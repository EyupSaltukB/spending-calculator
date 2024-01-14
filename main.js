const spendingInput = document.querySelector("#spending");
const priceInput = document.querySelector("#price");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");
/* console.log(spendingInput, priceInput, formBtn) */

/* izleme işlemleri */
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

/* total state (toplam durum) */
let total = 0;

function updateTotal(price) {
  total += Number(price);
  totalInfo.innerText = total;
}

/* harcama oluşturma */

function addExpense(e) {
  e.preventDefault();
  /*     console.log(spendingInput.value, priceInput.value) */

  /* boş harcama eklemeyi önleme */
  if (!priceInput.value || !spendingInput.value === "") {
    alert("Boş Gider Girilemez!");
    /* fonksiyonu durdurma */
    return;
  }

  /* 1-  div elemanı oluşturma */
  const spendingDiv = document.createElement("div");
  /* 2-  class ekleme */
  spendingDiv.classList.add("spending");
  /* 2.1 - eğer checkbox işaretlendi ise bir class daha ekler */
  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }
  /* 3-  içeriğini ayarlama */
  spendingDiv.innerHTML = `
                <h3>${spendingInput.value}</h3>
                <h3 id="value" >${priceInput.value}</h3> 
                <div class="buttons">
                    <img id="payment" src="images/payment.png" alt="">
                    <img id="remove" src="images/delete.png" alt="">
                </div>
  `;
  /* 4- listeye ekleme */
  list.appendChild(spendingDiv);

  /* toplam tutarı güncelle */
  updateTotal(priceInput.value);

  /* formları temizleme */
  spendingInput.value = "";
  priceInput.value = "";
}

/* silme işlemleri */
function handleClick(e) {
  //console.log(e.target) // alttaki işlemle aynı

  /* tıklanılan elemanı alma */
  const element = e.target;

  if (element.id === "remove") {
    /* tıklanılan elemanın kapsayıcısını alma */
    const wrapper = element.parentElement.parentElement;

    /* silinen elemanın fiyatını alma */
    const deletedPrice = wrapper.querySelector("#value").innerText;

    /* silinenin fiyatını toplamdan çıkarma */
    updateTotal( - Number(deletedPrice))    

    /* elemanı html'den kaldır */
    wrapper.remove();
  }
}

/* filtreleme işlemleri */
function handleFilter(e) {
  console.log(e.target.value);

  /* childNodes -> kapsayıcının içindeki child elemanları verir */
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        /* classında payed olup olmadığının kontrolü */
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
