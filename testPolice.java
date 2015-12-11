/* Police Project
 * @author Tadd Bindas
 * @version 1.00 2014/11/14
 */
import java.text.*;
import java.text.DecimalFormat;
import java.util.Scanner;
abstract class Policeman
{
    private String firstName;
    private String lastName;
    private int yearsOfService;
     
    DecimalFormat dos = new DecimalFormat("0.00");
     
    public Policeman(String first, String last,int y)
    {
        firstName = first;
        lastName = last;
        yearsOfService = y;
    }
     
    public String getFirstName()
    {
        return firstName;
    }
    public String getLastName()
    {
        return lastName;
    }
    public int getYearsOfService()
    {
        return yearsOfService;
    }
    public String toString()
    {
        return firstName +" " + lastName + "\n" +"years of service = " +yearsOfService;
    }
    public abstract double earnings();
    public abstract int benefitLevel();
}
 
class Patrolman extends Policeman
{
    protected static double basePatrolPay = 3600;
    Patrolman(String first, String last, int y)
    {
        super(first,last,y);
    }
     
    public double earnings()
    {
        double earn = getBasePatrolPay();
        return earn;
    }
     
    public int benefitLevel()
    {
        int level = 1;
        return level;
    }
    public double getBasePatrolPay()
    {
        double netPay = (basePatrolPay * .85);
        netPay += ((Math.sqrt(basePatrolPay) *.06) * getYearsOfService());
        netPay*= benefitLevel();
        return netPay;
    }
}
 
class Sergeant extends Patrolman
{
    protected static double baseSgtPay = 4700;
    public Sergeant(String first, String last,int y)
    {
        super(first, last, y);
    }
     
    public double earnings()
    {
        double earn = getBaseSgtPay();
        return earn;
    }
     
    public int benefitLevel()
    {
        int level = 2 + super.benefitLevel();
        return level;
    }
    public double getBaseSgtPay()
    {
        double netPay = (baseSgtPay * .82);
        netPay += ((Math.sqrt(baseSgtPay) * 1.2) * getYearsOfService());
        netPay*= benefitLevel();
        return netPay;
    }
     
}
 
class Lieutenant extends Sergeant
{
    protected static double baseLieutenantPay = 5900;
    public Lieutenant(String first, String last,int y)
    {
        super(first, last, y);
    }
     
    public double earnings()
    {
        double earn = getBaseLieutenantPay();
        return earn;
    }
     
    public int benefitLevel()
    {
        int level = 3 + super.benefitLevel();
        return level;
    }
    public double getBaseLieutenantPay()
    {
        double netPay = (baseLieutenantPay * .8);
        netPay += ((Math.sqrt(baseLieutenantPay) * 1.3) * getYearsOfService());
        netPay*= benefitLevel();
        return netPay;
    }
     
}
class testPolice
{
    public static void main(String[] args)
    {
        String fn;
        String ln;
        int years;

        Scanner in = new Scanner(System.in);

        System.out.println("What's your first name?");
        fn = in.nextLine();
        System.out.println("What's your last name?");
        ln = in.nextLine();
        System.out.println("How many years have your served?");
        years = in.nextInt();
         
        Patrolman p1 = new Patrolman(fn, ln, years);
        System.out.println(p1.toString());
        System.out.println("Earnings: $" + p1.dos.format(p1.earnings()));
        System.out.println("Benefit Level: " + p1.benefitLevel());
        System.out.println();
                 
        Sergeant p2 = new Sergeant(fn, ln, years);
        System.out.println(p2.toString());
        System.out.println("Earnings: $" + p2.dos.format(p2.earnings()));
        System.out.println("Benefit Level: " + p2.benefitLevel());
        System.out.println();
         
        Lieutenant p3 = new Lieutenant(fn, ln, years);
        System.out.println(p3.toString());
        System.out.println("Earnings: $" + p3.dos.format(p3.earnings()));
        System.out.println("Benefit Level: " + p3.benefitLevel());
         
        double average = ((p1.earnings()) + (p2.earnings()) + (p3.earnings()))/3;
         
        System.out.println("Average pay: $" + p3.dos.format(average));
         
    }
}