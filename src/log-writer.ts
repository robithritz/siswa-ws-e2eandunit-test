import * as fs from 'fs';

interface SimpleResponse {
    status: boolean,
    message: string,
    data?: any
}

export async function writeLogs(path: string, content: string): Promise<SimpleResponse> {
    try {
        const res = await writeFileAsync(path, content + '\n');

        return { status: true, message: "Write Successful" };
    } catch (err) {
        return { status: false, message: err.message };
    }
}

export async function readLogs(path: string): Promise<SimpleResponse> {
    try {
        const res = await readFileAsync(path);

        return { status: true, message: "Read Successful", data: res.toString() };
    } catch (err) {
        return { status: false, message: err.message };
    }
}


function writeFileAsync(path: string, content: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, { flag: 'a+' }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

function readFileAsync(path: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
}