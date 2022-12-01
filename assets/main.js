//es url api a donde se va a hacer la solicitud de la informacion. Rapidapi es un hub de API's donde se utilizo la api de youtube v3 para obtener la informacion directamente de Youtube, que en este caso eran los videos. Solo se necesito buscar el channel ID del canal que se quisiera sacar la informacion, la cantidad de elementos a traer y listo.
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCNasvzqv7PgBse2xlDLLsWw&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.querySelector("#content");  //accede al elemento html con el id content

//aqui se configura el tipo de solicitud que se va a realizar a la api. En este caso fue GET
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6bc269aa74msh8c8989a43867d75p1779d2jsn9c0db71926e0',  //esta informacion no se debe mostrar. CONSULTAR COMO SE OCULTA.
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//esta funcion se utiliza para traer la info de cualquier API, tranformarla en formato JSON y devolverla para su utilizacion
async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

//aqui se utilizo una funcion que se ejecuta automaticamente en su declaracion. Estructura: (funcion-a-ejecutar)().
(async () => {
    try{
        const video = await fetchData(API);  //se trae la informacion de la API
        //se crea un nuevo arreglo con la info traida de la API, a traves de la funcion MAP, para crear la estructura html utilizando la info especifica de cada elemento (para esto hay que analizar que viene en la solicitud y como esta organizada).
        let view = `
            ${video.items.map(video => `
            <a href="https://youtube.com/watch?v=${video.id.videoId}">
                <div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            </a>
            `).slice(0, 4).join('')} 
        `; //se usa slice y join para determinar cuantos elementos de todo lo que viene se quiere utilizar, en este caso fueron 4

        content.innerHTML = view;  //se inyecta las nuevas estructuras creadas al html dentro de la etiqueta con el id content
    }
    catch(error){
        console.log(error);
    }
})();