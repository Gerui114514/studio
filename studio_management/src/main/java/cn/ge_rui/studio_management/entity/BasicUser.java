package cn.ge_rui.studio_management.entity;

import java.time.LocalDateTime;

public class BasicUser {
    private String id;
    private String username;
    private String name;
    private String email;
    private String power;
    private String region;
    private LocalDateTime joinDate;
    private String job;

    public BasicUser() {
    }

    public BasicUser(String id, String username, String name, String email, String power, String region, LocalDateTime joinDate, String job) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.power = power;
        this.region = region;
        this.joinDate = joinDate;
        this.job = job;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    @Override
    public String toString() {
        return "BasicUser{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", power='" + power + '\'' +
                ", region='" + region + '\'' +
                ", joinDate=" + joinDate +
                ", job='" + job + '\'' +
                '}';
    }
}
