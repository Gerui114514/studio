package cn.ge_rui.studio_management.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class RegisterRequest {
    private String id;
    private String username;
    private String password;
    private String email;
    private String power;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private String joindate;

    public RegisterRequest() {
    }

    public RegisterRequest(String id, String username, String password, String email, String power, String joindate) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.power = power;
        this.joindate = joindate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
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

    public String getJoinDate() {
        return joindate;
    }

    public void setJoinDate(String joinDate) {
        this.joindate = joindate;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "id='" + id + '\'' +
                ", userName='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", power='" + power + '\'' +
                ", joinDate=" + joindate +
                '}';
    }
}