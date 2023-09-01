package com.kustoms.constants;

public enum StateUser {

    ACTIVE("active"),
    INACTIVE("Inactive");


    private final String value;

    StateUser(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
