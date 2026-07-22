import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey:"private_xBB/Hezsj9kRcuwpiYCe33d7lAw="
});

async function uploadFile(file) {
    const result = await imagekit.files.upload({
        file,
        fileName:"courses"+Date.now(),
        folder:"udemy"
    })
    return result;
};

export default uploadFile;