function doTime() {
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let currentTime = hours + minutes / 60;
    switch (true) {
        case currentTime >= 6 && currentTime < 12:
            console.log("good morning");
            output2.textContent="good morning";
            break;
        case currentTime >= 12 && currentTime < 17:
            console.log("good afternoon");
            output2.textContent="good afternoon";
            break;
        case currentTime >= 17 && currentTime < 22:
            console.log("good evening");
            output2.textContent="good evening";
            break;
        default:
            console.log("good night");
            output2.textContent="good night";
            break
    }
    console.log(currentTime);
    output1.textContent = currentTime + 'formatted in /100, to get currentTime in standard please do x/100 = y/60 where x = currentTime and y is your standard time.'
}