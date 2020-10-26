interface ISql {
    [index :string] : string;
}

const TSql = {} as ISql;
TSql ['SkillFindAll'] = "select*from tbl_skill;";
TSql ['SkillFindByKode'] = "select*from tbl_skill where kode = $1;";
TSql ['SkillFindInKode'] = "select*from tbl_skill where kode in ($1,$2,$3);";
TSql ['BlogInfoFindAll'] = "select*from tbl_bloginfo;";
TSql ['InsUser'] = "insert into tbl_user(username,fullname,password) values ($1,$2,MD5($3));";
export default TSql;