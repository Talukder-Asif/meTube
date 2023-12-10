var x, abbb;
const catagoryName = async() =>{
    const ref = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await ref.json();
    const catagory = document.getElementById('catagory');
    data.data.forEach(catName => {
    const div = document.createElement('div');
    div.innerHTML =`
    <a onclick="colCat(${catName.category_id})" class="px-4 py-2 rounded bg-[#d3d3d3] text-black font-medium normal-case text-sm">${catName.category}</a>
    `;
    catagory.appendChild(div);
    div.classList.add('inline-block','px-2','py-3')
    });
};

function timeTran(time)
{
  let h,d,mon, y, m;
  h = Math.floor( time / 3600 );
  time = time - (3600 * h);
  if(h>=24)
  {
    d = Math.floor(h/24);
    h = Math.round(h-(d*24));
    mon = Math.floor(d/30);
    d = Math.round(d - (mon * 30));
    y = Math.floor(mon / 12);
    mon = Math.round(mon -(y * 12))
    m = Math.floor(time / 60);
    const timeStr = `${y}y ${h}h ${m}m ago`
    return timeStr;
  }
  else
  {
    m = Math.round(time / 60);
    const timeStr = `${h}hrs ${m} min ago`
    return timeStr;
  }
  
}
let div1;
let videoBody;
let noVideo;
const colCat = async(id) =>{
    const refe = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data1 = await refe.json();
    x = id;
    diplayVideoOnSide(data1.data);
}
function diplayVideoOnSide(datass)
{
  if(datass.length !== 0)
        {
          noVideo = document.getElementById('noVideo');
          noVideo.innerHTML=' '
            videoBody = document.getElementById('VideoBody');
            videoBody.innerHTML='';
            datass.forEach(viedoInfo => {
            div1 = document.createElement('div');
            div1.innerHTML = `
            <div>
            <figure><img src="${viedoInfo?.thumbnail}" class="rounded-xl" style="height: 200px; width: 100%;" alt="Shoes" /></figure>
            ${viedoInfo?.others?.posted_date?`<div class=""><p class="text-right text-white mb-4 mt-[-40px] mr-5 pr-3 ml-[45%] md:ml-[50%] z-50 relative rounded-lg w-auto bg-[black]">${timeTran(viedoInfo?.others?.posted_date)}</p></div>`:' '}
            </div>
            <div class="p-4 gap-4 flex ">
              <div class="w-2/12">
                <img class="rounded-[50px] h-[3.1rem] w-14" src="${viedoInfo?.authors[0]?.profile_picture}" alt="">
              </div>
              <div class="w-8/12">
                <h2 class="card-title text-base font-bold">${viedoInfo?.title}</h2>
                <p class="my-3 text-[15px]">${viedoInfo?.authors[0]?.profile_name} <img class="inline-block" src="${viedoInfo.authors[0].verified? `images/fi_10629607.svg`:' '}" alt=""> </p>
                <p class="my-3 text-[15px]"><span>${viedoInfo?.others.views}</span> View</p>
              </div>
            </div>`;

            videoBody.appendChild(div1)
            abbbb = 1
            })

        }else{
            if(abbbb === 1)
            {
              videoBody = document.getElementById('VideoBody');
              videoBody.innerHTML='';
              noVideo = document.getElementById('noVideo');
              div1 = document.createElement('div')
              div1.innerHTML=`
              <div class="text-center mt-[50px] md:mt-[100px] ">
              <img class="m-auto" src="images/Icon.png" alt="">
              <h3 class="text-3xl font-bold">Oops!! Sorry, There is no <br>
              content here</h3>
              </div>
              `;
              noVideo.appendChild(div1);
              abbbb = 0;
            }
        }
}
    
    colCat('1000')
    catagoryName();

const shortView = async() =>{
  const refe = await fetch(`https://openapi.programming-hero.com/api/videos/category/${x}`)
  const data1 = await refe.json();
  console.log(data1);
  
  let arr = [];
  data1.data.forEach(data =>{
    arr.push(parseFloat(data.others.views));
  })

  function bubbleSort(arr, data) {
    var i, j;
    var len = arr.length;
    var isSwapped = false;
    for (i = 0; i < len; i++) {
        isSwapped = false;
        for (j = 0; j < len; j++) {
            if (arr[j] < arr[j + 1]) {
                var temp = arr[j];
                var temp1 = data[j];
                arr[j] = arr[j + 1];
                data[j] = data[j + 1];
                arr[j + 1] = temp;
                data[j + 1] = temp1;
                isSwapped = true;
            }
        }
        if (!isSwapped) {
            break;
        }
    }
    return data;
  }
const shortData = bubbleSort(arr, data1.data);
diplayVideoOnSide(shortData);
}