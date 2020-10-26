import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import {insert, select } from '../model/pg_model.ts';
import TSql from '../model/sql.ts';

const home = async ({response} :{response:any} ) => {
    const dataTable = await select(
        [
            {text : TSql['SkillFindAll']},
            {text : TSql['BlogInfoFindAll']}
        ]
    )
    const html = await renderFileToString("./template/home.ejs", { 
        data:{
            nama:"Devanty",
            skill :dataTable[0],
            bloginfo:dataTable[1],
            rekan :[
                {nim:"01", "nama":"Brillian Violet"},
                {nim:"02", "nama":"Devanty Ika S.P"},
                {nim:"03", "nama":"Angelilca Irish"}
            ]
        },
        subview:{
            namafile: "./template/blogmain.ejs",
            showjumbotron:true
        }
    });
    response.body=new TextEncoder().encode(html);
}
const signup =async ({response,request,state}:{response:any,request:any,state:any})=>{
    if (!request.hasBody){
        let signupError:string='';
        if((state.pesanError!=undefined) && (state.pesanError!='')){
            signupError=state.pesanError;
        }
        const html =await renderFileToString("./template/home.ejs",{
            data:{
                nama:"Devanty",
                skill :await select({
                    text : TSql ['SkillFindInKode'],
                    args: ['php','js','py']
                }),
                bloginfo:await select({
                    text:TSql['BlogInfoFindAll']
                }),
                statusSignup:signupError 
            },
            subview:{
                namafile: "./template/signup.ejs",
                showjumbotron:false
            }
        })
        response.body=new TextEncoder().encode(html);
    } else{
        const body = await request.body().value;
        const parseData = new URLSearchParams(body);
        const namalengkap = parseData.get("fullname");
        const namauser = parseData.get("username");
        const password= parseData.get("password");

        let hasil=await insert({
            text:TSql['InsUser'],
            args:[namauser,namalengkap,password]
        });
        if (hasil[0]=='Sukses'){
            state.pesanError='';
            response.body="Sukses menyimpan data ke database";
        }else{
            state.pesanError=hasil[1];
            response.redirect('/daftar');
        }
    } 
}
const kategori = async({params,response}:{params:{id:string},response:any})=>{
    response.body="ID Parameter " + params.id;
}
export { home, signup,kategori}