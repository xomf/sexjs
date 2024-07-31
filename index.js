export default async function init() {
    const { instance } = await WebAssembly.instantiateStreaming(
        fetch("./add.wasm"),
        {
            env: {
                alert: (ptr) => {
                    const memory = new Uint8Array(instance.exports.memory.buffer);
                    let str = "";
                    while (memory[ptr] !== 0) {
                        str += String.fromCharCode(memory[ptr++]);
                    }
                    alert(str);
                }
            }
        }
    );
    instance.exports.sex();
}

