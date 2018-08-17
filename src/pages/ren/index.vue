<template>
    <div class="page">
        <div class="page__hd" v-if="true">
            <div class="page__title">STEP 1/2</div>
            <div class="page__desc">旅行，从这一步开始</div>
        </div>
        <div class="page__bd">
            <div class="weui-cells__title">必填</div>
            <div class="weui-cells weui-cells_after-title">
                <div class="weui-cell weui-cell_input">
                    <div class="weui-cell__hd">
                        <div class="weui-label">昵称</div>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" :placeholder="userInfo.nickName" />
                    </div>
                </div>
                <!-- <div class="weui-cell weui-cell_input weui-cell_vcode">
                        <div class="weui-cell__hd">
                            <div class="weui-label">手机号</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" placeholder="请输入手机号" />
                        </div>
                        <div class="weui-cell__ft">
                            <div class="weui-vcode-btn">获取验证码</div>
                        </div>
                    </div> -->
                <div class="weui-cell weui-cell_input">
                    <div class="weui-cell__hd">
                        <div class="weui-label">生日</div>
                    </div>
                    <div class="weui-cell__bd">
                        <picker mode="date" value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
                            <div class="weui-input">{{date}}</div>
                        </picker>
                    </div>
                </div>
                <!-- <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">时间</div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker mode="time" value="time" start="09:01" end="21:01" @change="bindTimeChange">
                                <div class="weui-input">{{time}}</div>
                            </picker>
                        </div>
                    </div> -->
                <!-- <div class="weui-cell weui-cell_input weui-cell_vcode">
                        <div class="weui-cell__hd">
                            <div class="weui-label">验证码</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" placeholder="请输入验证码" />
                        </div>
                        <div class="weui-cell__ft">
                            <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px" />
                        </div>
                    </div> -->
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd weui-cell__hd_in-select-after">
                        <div class="weui-label">国家/地区</div>
                    </div>
                    <div class="weui-cell__bd">
                        <picker class="weui-btn" mode="region" :value="region" @change="CityChange">
                            <div class="weui-select weui-select_in-select-after" type="default">{{this.city}}</div>
                        </picker>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">一句话介绍</div>
            <div class="weui-cells weui-cells_after-title">
                <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="" placeholder="向这个世界表达你的心情与观点" style="height: 3.3em" />
                    <!-- <div class="weui-textarea-counter">0/200</div> -->
                </div>
                </div>
            </div> 
            <button href="/pages/go/main" @click="tog" class="weui-btn" type="primary">NEXT</button>
            
            <checkbox-group @click="bindAgreeChange">
                <label class="weui-agree" for="weuiAgree">
                    <div class="weui-agree__text">
                    <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" />
                    <div class="weui-agree__checkbox-icon">
                        <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="isAgree"></icon>
                    </div>
                    阅读并同意
                    <navigator url="" class="weui-agree__link">《相关条款》</navigator>
                    </div>
                </label>
            </checkbox-group>
         

        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                time: "09:01",
                date: "2015-09-01",
                userInfo: {},
                region: ['广东省', '广州市', '海珠区'],
                city: [],
                isAgree:false,
                toggle: true
            };
        },
        methods: {
            bindViewTap() {
                const url = "../logs/main";
                wx.navigateTo({
                    url
                });
            },
            getUserInfo() {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: res => { 
                                this.userInfo = res.userInfo;
                            }
                        });
                    }
                });
            },
            clickHandle(msg, ev) {
                console.log("clickHandle:", msg, ev);
            },
            bindDateChange(e) {
                this.date = e.mp.detail.value;
                console.log(e.mp.detail.value);
            },
            bindTimeChange(e) {
                this.time = e.mp.detail.value;
                console.log(e.mp.detail.value);
            },
            CityChange(e) {
                this.city = e.mp.detail.value;
                console.log('you live：' + e.mp.detail.value);
            },
            bindAgreeChange(e) {
                this.isAgree = !this.isAgree;
            },
            tog(e){
                this.toggle = !this.toggle
                console.log(this.toggle)

            }
        },
        created() {
            // 调用应用实例的方法获取全局数据
            this.getUserInfo();
        },
     

    };
</script>

<style scoped>
