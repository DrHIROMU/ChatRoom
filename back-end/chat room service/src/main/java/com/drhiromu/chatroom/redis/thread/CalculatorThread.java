package com.drhiromu.chatroom.redis.thread;

public class CalculatorThread implements Runnable{
    private Integer num1;
    private Integer num2;

    public CalculatorThread(){}

    public CalculatorThread(Integer num1, Integer num2){
        this.num1 = num1;
        this.num2 = num2;
    }

    @Override
    public void run() {
        int sum = 0;
        for(int i=0; i<9999999; i++){
            sum = sum + num1+num2;
        }
        System.out.printf("Sum of 2 numbers is %d\n", sum);
    }
}
