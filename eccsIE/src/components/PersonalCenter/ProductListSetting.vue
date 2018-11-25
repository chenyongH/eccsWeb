<template>
    <div class="releaseProducts">
        <h2 :style="styles"><span>修改产品</span></h2>
        <div class="cont">
            <!--商品名称-->
            <div class="label" style="width: 100%;">
                <span>商品名称：</span>
                <el-input type="text"
                          style="width:70.7%;"
                          size="mini"
                          v-model="name"></el-input>
            </div>
            <!--商品标题-->
            <div class="label" style="width: 100%;">
                <span>商品标题：</span>
                <el-input type="text"
                          style="width:70.7%;"
                          size="mini"
                          v-model="title"></el-input>
            </div>
            <!--商品编号-->
            <div class="label">
                <span>商品编号：</span>
                <el-input type="text"
                          size="mini"
                          v-model="goodsNo"></el-input>
            </div>
            <!--商品类型-->
            <div class="label">
                <span>商品类型：</span>
                <el-select @change="commodityType" v-model="CommodityType"
                           size="mini"
                           style="margin-left:15px;"
                           clearable placeholder="请选择">
                    <el-option
                            v-for="item in CommodityTypeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!--商品分类 三级联动@change="cascaderChange"-->
            <div class="label">
                <span>商品分类：</span>
                <el-cascader

                        v-model="option"
                        style="margin-left:15px;"
                        size="mini"
                        clearable
                        :options="options"
                        :change-on-select="true"
                ></el-cascader>
            </div>
            <!--商品品牌-->
            <div class="label">
                <span>商品品牌：</span>
                <el-select v-model="CommodityBrand"
                           size="mini"
                           style="margin-left:15px;"
                           clearable placeholder="请选择">
                    <el-option
                            v-for="item in CommodityBrandOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!--商品货品关联-->
            <div class="label" v-if="false">
                <span>商品规格：</span>
                <el-select v-model="CommodityRelated"
                           size="mini"
                           style="margin-left:15px;"
                           clearable placeholder="请选择">
                    <el-option
                            v-for="item in CommodityRelatedOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <!--销售价-->
            <div class="label" style="padding-left:14px;">
                <span>销售价：</span>
                <el-input type="number"
                          @keyup.native="handleKeyUp"
                          size="mini"
                          v-model="SalesPrice"></el-input>
            </div>
            <!--商品标签-->
            <div class="tags CommodityDetails">
                <span>商品标签：</span>
                <el-checkbox-group size="mini" v-model="CommodityLabel">
                    <el-checkbox-button v-for="(tag,idx) in tags" :label="tag.id" :key="idx">
                        {{tag.name}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </div>
            <!--商品主图和关联图片:file-list="fileList"-->
            <div class="label CommodityDetails">
                <span>商品图片：</span>
                <el-upload
                        :beforeUpload="beforeProductsUpload"
                        name="fileData"
                        :file-list="fileList"
                        :action="upLoadUrl+uploadImg"
                        list-type="picture-card"
                        :on-success="success"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <!--商品详情-->
            <div class="CommodityDetails">
                <span>商品详情：</span>
                <div>
                    <!-- 图片上传组件辅助-->
                    <el-upload
                            class="avatar-uploader"
                            :action="upLoadUrl+uploadImg"
                            name="fileData"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeUpload">
                    </el-upload>
                    <!--富文本编辑器组件@ready="onEditorReady($event)"-->
                    <el-row style="height:300px;margin-bottom: 66px" v-loading="quillUpdateImg">
                        <quill-editor
                                v-model="msg"
                                style="height:100%;"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @change="onEditorChange($event)"

                        >
                        </quill-editor>
                    </el-row>
                </div>
                <vue-ueditor-wrap v-if="false" ref="ueditor" v-model="msg" :destroy="false"
                                  :config="config"></vue-ueditor-wrap>
                <el-input v-if="false" type="textarea"
                          v-model="CommodityDetails"></el-input>
            </div>

        </div>
        <el-button @click="submit" class="submit" type="primary">保存</el-button>
    </div>
</template>
<style lang="less">
    .el-checkbox-button.is-checked .el-checkbox-button__inner {
        background-color: #17A6B5;
        border-color: #17A6B5;
    }

    .el-checkbox-button__inner {
        border-left: 1px solid #dcdfe6;
    }

    .tags {
        width: 100%;
        display: flex;
        .el-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            label {
                margin: 0 10px 10px 10px;
                width: auto !important;
                span {
                    border-radius: 4px !important;
                }
            }
        }
    }
</style>
<style lang="less" scoped>
    .releaseProducts {
        width: 870px;/*940*/
        display: flex;
        flex-flow: column;
        align-items: center;
        .tips {
            font-size: 16px;
            align-self: flex-start;
            margin-bottom: 30px;
        }
        .cont {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .label, label {
                width: 50%;
                margin-bottom: 26px;
                font-size: 14px;
                display: flex;
                #email_prompt {
                    font-size: 12px;
                    color: red;
                    width: 24%;
                    margin-left: 20px;
                }
                span {
                    white-space: nowrap
                }
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    margin-left: 15px;
                }
                .el-radio-group {
                    display: flex;
                }
                .el-input {
                    width: 194px;
                    height: 28px;
                    margin-left: 15px;
                }
                input {
                    margin-left: 15px;
                }
                .el-textarea {
                    margin-left: 15px;
                    width: 50%;
                }
            }
            .logo {
                height: 100px;
                width: 100px;
                border: 1px dashed #eee;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .CommodityDetails {
                width: 100%;
                font-size: 14px;
            }
        }
        .submit {
            width: 200px;
            height: 40px;
            margin: 40px auto;
        }
    }
</style>
<script>
    import {quillEditor} from 'vue-quill-editor'
    import {getCookie} from '../../assets/js/cookie.js'
    // import VueUeditorWrap from 'vue-ueditor-wrap'
    import $ from "jquery"
    import api from "../../api"
    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];
    export default{
        name: 'ProductListSetting',
        components: {
            // VueUeditorWrap
        },
        data(){
            return {
                styles:{
                    height: '35px',
                    backgroundColor: '#17a6b5',
                    lineHeight: '35px',
                    textIndent: '1em',
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'normal',
                    alingSelf: 'flex-start',
                    marginBottom: '20px',
                    width: '100%'
                },
                /*******************************/
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },  // 富文本编辑器配置

                /******************************/
                id: '',
                goodsNo: '', /*商品编号*/
                option: [], /*商品分类*/
                GoodsCnd: '/open/api/acc/saveGoodsCnd', /*获取商品分类*/
                /*GoodsType: '/open/api/acc/saveGoodsTypeCnd', /!*获取商品类型*!/*/
                GoodsType: '/open/api/acc/updateGoodsTypeCnd', /*获取商品类型*/
                fileList: [], /*图片存放*/
                uploadImg: '/open/api/file/upload/image', /*上传图片接口*/
                upLoadUrl: '', /*上传图片路径*/
                dialogImageUrl: '', /*图片预览*/
                dialogVisible: false, /*多图上传*/
                SalesPrice: '', /*销售价*/
                CommodityRelated: '', /*商品货品关联*/
                CommodityRelatedOptions: [],
                CommodityLabel: [], /*商品标签*/
                tags: [],
                CommodityDetails: '', /*商品详情*/
                /*富文本编辑器*/
                msg: '', /*商品详情*/
                config: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    /*serverUrl: 'http://116.196.89.209:9005/open/api/file/upload/image',*/
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: './UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false
                },
                CommodityBrand: '', /*商品品牌*/
                CommodityBrandOptions: [],
                CommodityType: '', /*商品类型*/
                CommodityTypeOptions: [],
                title: '', /*商品标题*/
                name: '', /*商品名称*/
                options: [],
                /*saveGoods:'/open/api/acc/saveGoods',/!*发布商品*!/*/
                saveGoods: '/open/api/acc/updateGoods', /*发布商品*/
            }
        },
        methods: {
          /*当前价格验证*/
          handleKeyUp(){
            this.SalesPrice=(parseInt((this.SalesPrice=this.SalesPrice.toString().replace(/\D/g,''))==''||parseInt((this.SalesPrice=this.SalesPrice.toString().replace(/\D/g,''))==0)?'':this.SalesPrice,10))
          },
            /*产品图片上传前*/
            beforeProductsUpload(file){
                let testmsg=file.name.substring(file.name.lastIndexOf('.')+1);
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = file.size / 1024 / 1024 < 1;
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 1MB!',
                        type: 'warning'
                    });
                }  return extension || extension2 && isLt2M
            },
            /*编辑器*/
            onEditorChange(e){
                /*console.log(e)*/
                /*this.msg=e.html;*/
            },
            // 上传图片前
            beforeUpload(res, file) {
                // 显示loading动画
                this.quillUpdateImg = true;
                let testmsg=res.name.substring(res.name.lastIndexOf('.')+1);
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = res.size / 1024 / 1024 < 1;
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 1MB!',
                        type: 'warning'
                    });
                    this.quillUpdateImg = false;
                }  return extension || extension2 && isLt2M
            },
            // 上传图片成功
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === 0) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', api.imgUrl + res.data.file_url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },
            /*选择商品类型*/
            commodityType(e){
                let pa = {
                        typeId: e
                    },
                    url = this.GoodsCnd;
                this.server(url, pa).then(res => {
                    this.options = res.data.goodsClassList;
                    /*分类*/
                    this.CommodityBrandOptions = res.data.brandList;
                    /*品牌*/
                })
            },
            /*多图上传成功*/
            success(res, file, fileList){
                this.fileList = fileList;
            },
            /*多图上传--删除*/
            handleRemove(file, fileList) {
                /*console.log(file, fileList);*/
                this.fileList = fileList;
            },
            /*多图上传--预览*/
            handlePictureCardPreview(file) {
                /*console.log(file);*/
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /*提交发布*/
            submit(){
                let List = [];
                this.fileList.map((item, index) => {
                    if (item.response) {
                        List.push(item.response.data.file_url);
                    } else if (item.url) {
                        List.push(item.url.replace(api.imgUrl, ""));
                    }

                });
                let map = {
                        goodsId: this.id,
                        accId: getCookie('userId'), /*商户ID*/
                        goodsNo: this.goodsNo,
                        name: this.name, /*名称*/
                        salePrice: `${this.SalesPrice}`, /*销售价*/
                        title: this.title, /*标题*/
                        classId: this.option[this.option.length - 1], /*分类*/
                        typeId: this.CommodityType, /*类型*/
                        brandId: this.CommodityBrand, /*品牌*/
                        tagIds: this.CommodityLabel, /*标签*/
                        imageList: List, /*图片*/
                        pcNote: this.msg, /*详情*/
                    },
                    pa = {
                        goodsData: JSON.stringify(map)
                    },
                    url = this.saveGoods;
                this.server(url, pa).then(res => {
                    if (res.code) {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: '/personalCenter/ProductList'
                            })
                        }, 500)
                    }
                });
            },
            /*******************************服务接口**********************/
            server: (url, param) => {
                return api.$http(api.serverSupply + api.collection + url, param)
            },
        },
        mounted(){
            this.upLoadUrl = api.serverSupply + api.portLogin;
            this.id = this.$route.query.id;
            this.imgUrl = api.imgUrl;
            let GoodsType = this.GoodsType,
                pa = {
                    goodsId: this.$route.query.id
                };
            this.server(GoodsType, pa).then(res => {
                this.CommodityTypeOptions = res.data.goodsTypes;
                /*商品类型*/
                this.tags = res.data.tagList;
                this.name = res.data.goodsMain.name;
                /*商品名称*/
                this.goodsNo = res.data.goodsMain.goodsNo;
                /*商品编号*/
                this.title = res.data.goodsMain.title;
                /*商品编号*/
                this.CommodityType = res.data.goodsMain.typeId;
                /*商品类型*/
                this.option = res.data.frontClassIdList;
                /*商品分类*/
                this.CommodityBrand = res.data.goodsMain.goodsBrand.id;
                /*商品品牌*/
                this.SalesPrice = res.data.goodsMain.salePrice;
                /*销售价*/
                /*/!*商品标签*!/*/
                res.data.goodsMain.tagList.map(item => {
                    this.CommodityLabel.push(item.id)
                });
                /*this.fileList=res.data.goodsMain.salePrice;/!*商品图片*!/*/
                res.data.goodsMain.imageList.map((item, index) => {
                    this.fileList.push({url: api.imgUrl + item.imgList})
                });
                this.msg = res.data.goodsMain.pcNote;
                /*商品详情*/
                let GoodsCnd = this.GoodsCnd, pas = {
                    typeId: res.data.goodsMain.typeId
                };
                this.server(GoodsCnd, pas).then(res => {
                    this.options = res.data.goodsClassList;
                    /*分类*/
                    this.CommodityBrandOptions = res.data.brandList;
                    /*品牌*/
                })
            });

//            $("#ReleaseProducts").css({backgroundColor: '#17A6B5'});
            $("#ProductList>a").css({color: '#17A6B5'});
        },
        beforeDestroy: function () {
            $("#ProductList").css({backgroundColor: '#fff'});
            $("#ProductList>a").css({color: '#333'});
        },
    }
</script>
