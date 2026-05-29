package cn.ge_rui.studio_management.entity;

import java.time.LocalDateTime;

public class Project {
    private String projectId;
    private String projectName;
    private String projectDesc;
    private String icon;
    private String image;
    private LocalDateTime createTime;
    private String principalId;
    private String principalName;
    private String state;

    public Project() {
    }

    public Project(String projectId, String projectName, String projectDesc, String icon, String image, LocalDateTime createTime, String principalId, String principalName, String state) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.icon = icon;
        this.image = image;
        this.createTime = createTime;
        this.principalId = principalId;
        this.principalName = principalName;
        this.state = state;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDesc() {
        return projectDesc;
    }

    public void setProject_Desc(String project_Desc) {
        this.projectDesc = projectDesc;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectId='" + projectId + '\'' +
                ", projectName='" + projectName + '\'' +
                ", projectDesc='" + projectDesc + '\'' +
                ", icon='" + icon + '\'' +
                ", image='" + image + '\'' +
                ", createTime=" + createTime +
                ", principalId='" + principalId + '\'' +
                ", principalName='" + principalName + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
