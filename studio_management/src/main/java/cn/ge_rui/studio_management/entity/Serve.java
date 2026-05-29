package cn.ge_rui.studio_management.entity;

import java.time.LocalDateTime;

public class Serve {
    private String serviceId;
    private String serviceName;
    private String serviceDesc;
    private String icon;
    private String image;
    private LocalDateTime createTime;
    private String principalId;
    private String principalName;

    public Serve() {
    }

    public Serve(String serviceId, String serviceName, String serviceDesc, String icon, String image, LocalDateTime createTime, String principalId, String principalName) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.serviceDesc = serviceDesc;
        this.icon = icon;
        this.image = image;
        this.createTime = createTime;
        this.principalId = principalId;
        this.principalName = principalName;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceDesc() {
        return serviceDesc;
    }

    public void setServiceDesc(String serviceDesc) {
        this.serviceDesc = serviceDesc;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public String getPrincipalId() {
        return principalId;
    }

    public void setPrincipalId(String principalId) {
        this.principalId = principalId;
    }

    public String getPrincipalName() {
        return principalName;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    @Override
    public String toString() {
        return "Serve{" +
                "serviceId='" + serviceId + '\'' +
                ", serviceName='" + serviceName + '\'' +
                ", serviceDesc='" + serviceDesc + '\'' +
                ", icon='" + icon + '\'' +
                ", image='" + image + '\'' +
                ", createTime=" + createTime +
                ", principalId='" + principalId + '\'' +
                ", principalName='" + principalName + '\'' +
                '}';
    }
}
