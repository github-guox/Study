# 177 第N高的薪水



```wiki

```



```mysql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
      # Write your MySQL query statement below.
      SELECT IFNULL((SELECT DISTINCT Salary
              FROM Employee
              ORDER BY Salary DESC
              LIMIT 1 OFFSET N-1),NULL)        
  );
END
```

上述语法报错 `N-1` <br/>

```mysql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  RETURN (
      # Write your MySQL query statement below.
      DECLARE P INT;
      SET P = N - 1;
      SELECT IFNULL((SELECT DISTINCT Salary
              FROM Employee
              ORDER BY Salary DESC
              LIMIT 1 OFFSET P),NULL)        
  );
END
```

语法报错`DECLARE P INT;`与`SET P = N - 1;`应该放在RETURN的外面。<br/>

```mysql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    
  DECLARE P INT;
  SET P = N - 1;
  
  RETURN (
      # Write your MySQL query statement below.
      
      SELECT IFNULL((SELECT DISTINCT Salary
              FROM Employee
              ORDER BY Salary DESC
              LIMIT 1 OFFSET P),NULL)        
  );
END
```

