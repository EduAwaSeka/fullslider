package com.mycompany.fullslidertest;

/**
 * Hello world!
 *
 */
public class App {

    public static void main(String[] args) {
        FullsliderTest test = new FullsliderTest();
        test.addSlideSaveAndLoad();
        test.addTextAndMoveIt();
        test.addSlideAndReorder();
        test.toPDF();
        test.addSlideAndView();
        test.editText();
        test.editCode();
        test.drawEllipseAndChangeOpacity();
    }
}
