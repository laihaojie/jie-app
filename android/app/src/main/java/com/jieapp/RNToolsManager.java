package com.jieapp;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class RNToolsManager extends ReactContextBaseJavaModule {

    public RNToolsManager(ReactApplicationContext reactContext) {

        super(reactContext);

    }

    //    重写getName方法声明Module类名称,在RN调用时用到
    @Override
    public String getName() {
        return "RNToolsManager";
    }

    //    声明的方法，外界调用
    @ReactMethod
    public void getAppVersion(Callback successCallback) {
        try {
            PackageInfo info = getPackageInfo();
            if (info != null) {
                successCallback.invoke(info.versionName);
            } else {
                successCallback.invoke("");
            }
        } catch (IllegalViewOperationException e) {

        }
    }

    //    获取 APP 信息
    private PackageInfo getPackageInfo() {
        PackageManager manager = getReactApplicationContext().getPackageManager();
        PackageInfo info = null;
        try {
            info = manager.getPackageInfo(getReactApplicationContext().getPackageName(), 0);
            return info;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

            return info;
        }
    }
}