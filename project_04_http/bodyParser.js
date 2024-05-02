export default function bodyParser(contentType, body){

    const parsedContentType = contentType.split('; boundary=');


    // console.log('parsedContentType', parsedContentType);

    switch (parsedContentType[0]){
        case 'application/x-www-form-urlencoded':
            console.log('body', body);
            return body.split('&').map(fieldDraft=> {
                const parsedFieldDraft = fieldDraft.split('=');
                return {
                    name: parsedFieldDraft[0],
                    value: parsedFieldDraft[1]
                }
            }).filter(item=>{
                return item.name !== 'files';
            });
        case 'text/plain':
            return body.split('\r\n').map(fieldDraft=> {
                const parsedFieldDraft = fieldDraft.split('=');
                return {
                    name: parsedFieldDraft[0],
                    value: parsedFieldDraft[1]
                }
            }).filter(item=>{
                return item.name && item.value && item.name !== 'files';
            });
        case 'multipart/form-data':
            const boundary = parsedContentType.length > 1 ? '--' + parsedContentType[1] : null;
            return body.split(boundary).filter(item=>{
                return item.includes('Content-Disposition');
            }).map(draft=>{
                const parsedField = draft.split('\r\n').filter(item=>{
                    return item.length;
                });
                return {
                    name: parsedField[0].split('"')[1],
                    value: parsedField[1]
                }
            }).filter(item=>{
                return item.name !== 'files';
            });
        case 'application/json':
            try {
                const parsedBody = JSON.parse(body);
                const keys = Object.keys(parsedBody);
                const res = [];
                for (const key of keys) {
                    res.push({
                        name: key,
                        value: parsedBody[key]
                    });
                }
                return res;
            } catch (e) {
                return false;
            }
        default:
            return false;
    }
}