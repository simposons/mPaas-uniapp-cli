const getUpdateManager = () => {
  const updateManager = uni.getUpdateManager();
  if (!updateManager) {
    console.log('不支持提醒用户更新功能');
    return;
  }
  return new Promise((resolve, reject) => { 
    updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });
    updateManager.onUpdateReady((e) => {
      uni.confirm({
        title: '更新提示',
        content: '发现有最新版，是否重新启动小程序？',
        success(res) {
          if (res.confirm) {
            resolve(res, e);
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed((e) => {
    // 新版本下载失败
      reject(e);
    });
  });
};

export default { 
  getUpdateManager, 
};
