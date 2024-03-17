


export default function generateRandomRANumber() {
    const timestamp = new Date().getTime();
    const seed = timestamp % 100000000;
    const randomNumber = Math.floor(Math.random() * seed);
    const formattedNumber = String(randomNumber).padStart(8, "0");
    return formattedNumber;
}