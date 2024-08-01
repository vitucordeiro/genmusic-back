export function validatePrompt(prompt:string):boolean{
    const minLength:number = 10;
    const badWords:Array<string> = ['nigga', 'niggers', 'fat']
    
    if(prompt.trim().length < minLength) return false

    if(badWords.some(word => prompt.toLowerCase().includes(word))) return false;

    if(prompt === prompt.toLocaleLowerCase()) return false;

    return true;
}