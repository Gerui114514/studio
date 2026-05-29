package cn.ge_rui.studio_management.entity;

import java.time.LocalDateTime;

public class Contact {
    private Integer contactId;
    private String contactName;
    private String contactEmail;
    private String contactDesc;
    private LocalDateTime createTime;

    public Contact() {
    }

    public Contact(Integer contactId, String contactName, String contactEmail, String contactDesc, LocalDateTime createTime) {
        this.contactId = contactId;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.contactDesc = contactDesc;
        this.createTime = createTime;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactDesc() {
        return contactDesc;
    }

    public void setContactDesc(String contactDesc) {
        this.contactDesc = contactDesc;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "contactId='" + contactId + '\'' +
                ", contactName='" + contactName + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", contactDesc='" + contactDesc + '\'' +
                ", createTime='" + createTime + '\'' +
                '}';
    }
}
