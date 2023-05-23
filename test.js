function time(params) {
    setTimeout(() => {
        console.log(1000);
    }, 1000);
}
function time2(params) {
    setTimeout(() => {
        console.log(1001);
    }, 1000);
}
async function add() {
    console.log(00000);
    await time2();
    await time();
    console.log(20000);
}
add();
