# PulsePoint

**Факултетен номер:** 2301321042
**Име на проекта:** PulsePoint  

## 📋 Кратко описание

PulsePoint е уеб приложение за проследяване на здравни показатели като тегло, крачки, прием на вода, сън и цели. Потребителите могат да се регистрират и логнат, след което да въвеждат и следят свои здравни данни в реално време. Приложението е създадено с цел да улесни поддържането на здравословен начин на живот чрез лесен достъп до дневните показатели и мотивация чрез цели.

**Технологии:**
- **Frontend:** React (Vite) + Material UI  
- **Backend:** ASP.NET Core + Entity Framework Core  
- **База данни:** SQL Server

## ⚙️ Инструкции за инсталация и стартиране

### Изисквания:
- Node.js и npm
- .NET 7 SDK или по-нова
- SQL Server

### Стъпки за стартиране:

#### 1. Стартиране на Backend:

```bash
cd PulsePoint.API
dotnet run
```

По подразбиране API работи на `https://localhost:5001` или `http://localhost:5000`.

#### 2. Update за базата:

```bash
cd PulsePoint.Repository
dotnet restore
dotnet ef database update
```

#### 3. Стартиране на Frontend:

```bash
cd pulse-point-client
npm install
npm run dev
```

Frontend се стартира на `http://localhost:5173`

---

### 📎 Забележка:
В случай че възникнат грешки с връзката към базата данни, уверете се, че connection string-ът в `appsettings.json` (в PulsePoint.API) е правилно настроен според вашата среда.
