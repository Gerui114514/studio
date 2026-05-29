package cn.ge_rui.studio_management.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class FullUser {
    private String id;
    private String userName;
    private String password;
    private String email;
    private String power;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime joinDate;
    private LocalDateTime birthTime;
    private String region;
    private String job;

    public FullUser() {
    }

    public FullUser(String id, String userName, String password, String email, String power, String name, LocalDateTime joinDate, LocalDateTime birthTime, String region, String job) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.power = power;
        this.name = name;
        this.joinDate = joinDate;
        this.birthTime = birthTime;
        this.region = region;
        this.job = job;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public LocalDateTime getBirthTime() {
        return birthTime;
    }

    public void setBirthTime(LocalDateTime birthTime) {
        this.birthTime = birthTime;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    @Override
    public String  toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", power='" + power + '\'' +
                ", name='" + name + '\'' +
                ", joinDate=" + joinDate +
                ", birthTime=" + birthTime +
                ", region='" + region + '\'' +
                ", job='" + job + '\'' +
                '}';
    }
}
