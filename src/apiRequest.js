const apiRequest = async(url='',optionsObj=null,errorMsg=null)=>{
    try{
        const res = await fetch(url,optionsObj);
        if (!res.ok) throw Error('Did not receive expected data');

    }catch(e){
        console.log('Error fetching data:', e);
        errorMsg = e.message;
    }finally{
        return errorMsg;
    }
}
export default apiRequest;