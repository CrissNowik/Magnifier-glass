/**
 * magnifiering - main funcion responsible for scaling photo visible in circle
 * @param {string} imgID - Image ID from HTML element where glass should be aplied
 * @param {number} zoom  - number used for scaling 1 = normal scale
 */

function magnifiering(imgID, zoom) {
    let img, // image which will be scaled
    glass, // created new HMTL element representing magnifier glass
    width, 
    height, 
    closer; // number for scaling

    img = document.getElementById(imgID);
    glass = document.createElement("div");
    glass.setAttribute("class", "img-magnifier-circle");
    img.parentElement.insertBefore(glass, img);
// setting photo in glass
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
// scaling
    closer = 3;
    width = glass.offsetWidth / 2;
    height = glass.offsetHeight / 2;
// event listeners for desktop and mobile
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

/**
 * moveMagnifier - function is called when mouse moves and is consuming cursor position from getCursorPosition and then is attaching this coordinates to in order to stop circle on photo surface
 * @param {event} e - mousemove or touchmove
 */
    function moveMagnifier(e) {
        let position, x, y;
        e.preventDefault();

        position = getCursorPosition(e);
        x = position.x;
        y = position.y;

        if (x > img.width - (width / zoom)){ 
            x = img.width - (width / zoom); 
        }
        if (x < width / zoom){ 
            x = width / zoom; 
        }
        if (y > img.height - (height / zoom)){
             y = img.height - (height / zoom); 
        }
        if (y < height / zoom) {
             y = height / zoom; 
        }

        glass.style.left = (x - width) + "px";
        glass.style.top = (y - height) + "px";

        glass.style.backgroundPosition = "-" + ((x * zoom) - width + closer) + "px -" + ((y * zoom) - height + closer) + "px";
    }
/**
 * getCursorPosition - function used in order to collect mouse cursor position and send it as 2-key object to moveMagnifier() - consumer function
 * @param {event} e - mousemove or touchmove
 */
    function getCursorPosition(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();

        x = e.pageX - a.left;
        y = e.pageY - a.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}