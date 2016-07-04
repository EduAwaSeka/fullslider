package com.mycompany.fullslidertest;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;

public class FullsliderTest {

    WebDriver driver;
    JavascriptExecutor js;
    Actions actions;

    public void createPresentation(String title) {
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        actions = new Actions(driver);

        driver.get("http://localhost:8888");
        driver.manage().window().maximize();

        js.executeScript("$('.newpresopanel')[0].click()");
        js.executeScript("$('#titleinput').val('" + title + "')");
        js.executeScript("$('.createpresentation')[0].click()");
    }

    public void waitForAction() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {
            Logger.getLogger(FullsliderTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void addSlideSaveAndLoad() {
        createPresentation("Add slide download and load");

        js.executeScript("$('#addslidebtn').click()");
        js.executeScript("$('#downloadpresbtn').click()");
        waitForAction();
        driver.findElement(By.id("inputFile")).sendKeys("C:/Users/Edu/Downloads/Add_slide_download_and_load.fspf");
        
        waitForAction();
        driver.quit();
    }

    public void addTextAndMoveIt() {
        createPresentation("Add text and move it");

        js.executeScript("$('#addtextbtn').click()");
        WebElement draggable = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section/div[3]"));
        waitForAction();
        new Actions(driver)
                .dragAndDropBy(draggable, 10, 200)
                .build()
                .perform();
        draggable.click();
        
        waitForAction();
        driver.quit();
    }

    public void addSlideAndReorder() {
        createPresentation("Add slide and reorder it");

        js.executeScript("$('#addslidebtn').click()");
        js.executeScript("$('#addtextbtn').click()");
        WebElement draggableText = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section[2]/div[3]"));
        waitForAction();
        actions.dragAndDropBy(draggableText, 10, 200)
                .build()
                .perform();
        draggableText.click();

        WebElement draggableSlide1 = driver.findElement(By.xpath("//div[@id='vertical-toolbar']/div/div/div/div[1]"));
        WebElement draggableSlide2 = driver.findElement(By.xpath("//div[@id='vertical-toolbar']/div/div/div/div[2]"));

        int offset = draggableSlide2.getLocation().getY() - draggableSlide1.getLocation().getY();
        Actions builder = new Actions(driver);
        Actions dragAndDrop = builder.moveToElement(draggableSlide1)
                .clickAndHold()
                .moveByOffset(0, offset + 10)
                .pause(500); // I found the pauses were necessary to get the test working in other
        dragAndDrop
                .release()
                .perform();

        waitForAction();
        driver.quit();
    }

    public void toPDF() {
        createPresentation("Add two slides and export to pdf");

        js.executeScript("$('#addslidebtn').click()");
        js.executeScript("$('#addslidebtn').click()");
        waitForAction();
        driver.findElement(By.id("menu")).click();
        driver.findElement(By.id("pdfbtn")).click();
        
        waitForAction();
        driver.quit();
    }

    public void addSlideAndView() {
        createPresentation("Add slide and view presentation");
        js.executeScript("$('#addslidebtn').click()");
        waitForAction();
        driver.findElement(By.id("viewbtn")).click();
        
        waitForAction();
        driver.quit();
    }

    public void editText() {
        createPresentation("Edit Text");
        waitForAction();

        WebElement textElement = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section/div[1]"));
        WebElement text = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section/div[1]/div/font"));
        actions.doubleClick(textElement).build().perform();
        actions.doubleClick(text).build().perform();

        waitForAction();

        driver.findElement(By.className("etch-bold")).click();
        driver.findElement(By.xpath("//div[@id='etch-font-family']/a")).click();
        driver.findElement(By.xpath("//div[@id='etch-font-family']/ul/li/a[6]")).click();
        driver.findElement(By.id("workspace")).click();

        waitForAction();
        driver.quit();
    }

    public void editCode() {
        createPresentation("Edit Code");
        waitForAction();

        driver.findElement(By.id("addcodebtn")).click();

        WebElement code = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section/div[3]"));
        actions.doubleClick(code).build().perform();
        waitForAction();

        driver.findElement(By.xpath("//div[@id='code-style-menu']/a")).click();
        driver.findElement(By.xpath("//div[@id='code-style-menu']/ul/li/a[4]")).click();
        driver.findElement(By.id("workspace")).click();

        waitForAction();
        driver.quit();
    }

    public void drawEllipseAndChangeOpacity() {
        createPresentation("Draw Ellipse and change opacity");
        waitForAction();

        driver.findElement(By.id("drawEllipse")).click();

        WebElement canvas = driver.findElement(By.id("canvas"));

        Actions builder = new Actions(driver);
        Action drawOnCanvas = builder
                .clickAndHold(canvas)
                .moveByOffset(60, 60)
                .release()
                .build();
        drawOnCanvas.perform();

        driver.findElement(By.id("editEnd")).click();

        WebElement code = driver.findElement(By.xpath("//div[@id='workspace']/div[2]/div/section/div[3]"));
        actions.doubleClick(code).build().perform();
        waitForAction();

        driver.findElement(By.id("edit-fill-opacity")).click();
        driver.findElement(By.xpath("//select[@id='edit-fill-opacity']/option[7]")).click();
        driver.findElement(By.id("workspace")).click();

        waitForAction();
        driver.quit();
    }
}
