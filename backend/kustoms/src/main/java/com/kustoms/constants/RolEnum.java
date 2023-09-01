package com.kustoms.constants;

public enum RolEnum {

    USER("user"),
    ADMIN("admin");


    private final String value;

    RolEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
