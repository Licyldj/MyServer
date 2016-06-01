package com.client.httpclients;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import net.sf.json.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class Client_Text2Audio {
	/**
     * 根据key获取token
     * 
     * @return
     * @throws IOException
     * @throws ClientProtocolException
     */
    public static String getToken() throws ClientProtocolException, IOException {
        String token = "";
        StringBuilder uri = new StringBuilder("https://openapi.baidu.com/oauth/2.0/token?");
        String grant_type = "client_credentials";// 必须参数，固定为“client_credentials
        String client_id = "WT43WrZ8MABAnZ5Iz9NYYSzG";// 必须参数，应用的API Key
        String client_secret = "95d56bcd683f6209f8cf8298127e01bf";// 必须参数，应用的Secret
                                                                  // Key
        String scope = "";// 非必须参数。以空格分隔的权限列表，采用本方式获取Access
                          // Token时只能申请跟用户数据无关的数据访问权限
        uri.append("grant_type=").append(grant_type).append("&");
        uri.append("client_id=").append(client_id).append("&");
        uri.append("client_secret=").append(client_secret);
        // uri.append("").append("");

        HttpClientBuilder builder = HttpClientBuilder.create();
        CloseableHttpClient client = builder.build();
        HttpPost httpPost = new HttpPost(uri.toString());
        System.out.println(httpPost.getURI());
        // 执行get请求
        HttpResponse httpResponse = client.execute(httpPost);
        // 获取响应消息实体
        HttpEntity entity = httpResponse.getEntity();
        // 响应状态
        System.out.println("status:" + httpResponse.getStatusLine());
        // 判断响应实体是否为空
        if (entity != null) {
            System.out.println("contentEncoding:" + entity.getContentEncoding());
            String respStr = EntityUtils.toString(entity);
            System.out.println("response content:" + respStr);
            JSONObject jsonObject = JSONObject.fromObject(respStr);
            token = (String) jsonObject.get("access_token");
            System.out.println(token);
        }
        return token;
    }

    /**
     * @throws Exception
     * @throws ClientProtocolException
     * 
     * 
     */
    public static void text2audio() throws ClientProtocolException, Exception {
        StringBuffer uri = new StringBuffer("http://tsn.baidu.com/text2audio?");
        String tex = "百度语音，面向广大开发者永久免费开放语音合成技术。所采用的离在线融合技术，根据当前网络状况，自动判断使用本地引擎或者云端引擎，进行语音合成，再也不用担心流量消耗了！";// 必填
                                                                                                          // 合成的文本，使用UTF-8编码，请注意文本长度必须小于1024字节
        String lan = "zh";// 必填 语言选择,填写zh
        String tok = "24.0100d631ef377417e4cf5aa2f820fa35.2592000.1466675375.282335-7785478";// 必填
                                                                                             // 开放平台获取到的开发者
                                                                                             // access_token
        String ctp = "1";// 必填 客户端类型选择，web端填写1
        String cuid = "44-A8-42-F9-38-FA";// 必填 用户唯一标识，用来区分用户，填写机器 MAC 地址或 IMEI
                                          // 码，长度为60以内
        String spd = "5";// 选填 语速，取值0-9，默认为5中语速
        String pit = "5";// 选填 音调，取值0-9，默认为5中语调
        String vol = "5";// 选填 音量，取值0-9，默认为5中音量
        String per = "0";// 选填 发音人选择，取值0-1, 0为女声，1为男声，默认为女声

        uri.append("tex=").append(tex).append("&");
        uri.append("lan=").append(lan).append("&");
        uri.append("tok=").append(tok).append("&");
        uri.append("ctp=").append(ctp).append("&");
        uri.append("cuid=").append(cuid);

        HttpClientBuilder builder = HttpClientBuilder.create();
        CloseableHttpClient client = builder.build();
        HttpPost httpPost = new HttpPost(uri.toString());
        System.out.println(httpPost.getURI());
        // 执行get请求
        HttpResponse httpResponse = client.execute(httpPost);
        // 获取响应消息实体
        httpResponse.addHeader("Content-Type", "audio/mp3");
        HttpEntity entity = httpResponse.getEntity();
        // 响应状态
        // String status = httpResponse.getStatusLine().getStatusCode()+"";

        System.out.println("status:" + httpResponse.getStatusLine());
        int c;
        byte buffer[] = new byte[1024];
        if (entity != null) {
            System.out.println("contentEncoding:" + entity.getContentEncoding());
            // String respStr = EntityUtils.toString(entity);
            InputStream in = entity.getContent();
            FileOutputStream out = new FileOutputStream(new File(
                    "G:\\MyEclipse Workspaces\\Workspaces\\MyServer\\WebRoot\\audio\\add.mp3"));
            while ((c = in.read(buffer)) != -1) {
                for (int i = 0; i < c; i++) {
                    out.write(buffer[i]);
                }
            }
            in.close();
            out.close();

        }
    }
}
