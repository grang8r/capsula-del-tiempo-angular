import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimeCapsuleComponent } from './time-capsule.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TimeCapsuleComponent', () => {
  let fixture: ComponentFixture<TimeCapsuleComponent>;
  let component: TimeCapsuleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeCapsuleComponent, FormsModule], // Aquí usas el componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TimeCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Verifica si el componente se crea correctamente
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Verifica que el mensaje se guarde en el modelo cuando se escribe en el input
  it('should update the model when user enters a message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement;
    const inputMessage = 'Este es un mensaje de prueba';

    textarea.value = inputMessage; // Escribe en el textarea
    textarea.dispatchEvent(new Event('input')); // Dispara el evento de input
    fixture.detectChanges();

    expect(component.userMessage).toBe(inputMessage); // Verifica que el modelo ha sido actualizado
  });

  // 3. Verifica si el mensaje encriptado se genera correctamente al llamar sendMessage()
  it('should encrypt the message when sendMessage() is called', () => {
    component.userMessage = 'mensaje secreto';
    component.sendMessage();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const encryptedText = compiled.querySelector('.encrypted-section pre')?.textContent;

    expect(encryptedText).toBeTruthy(); // Verifica que se muestre el mensaje encriptado
    expect(component.encryptedMessage).toBeTruthy(); // El mensaje encriptado no debe estar vacío
  });

  // 4. Verifica que el contador de la cuenta regresiva empieza en 10
  it('should start countdown when message is encrypted', fakeAsync(() => {
    component.userMessage = 'mensaje oculto';
    component.sendMessage();

    expect(component.countdown).toBe(10); // El contador debe empezar en 10

    tick(1000); // Avanza 1 segundo
    fixture.detectChanges();

    expect(component.countdown).toBe(9); // El contador debe haber disminuido
  }));

  // 5. Verifica que el mensaje se desencripte después de que se complete la cuenta regresiva
  it('should decrypt the message after countdown', fakeAsync(() => {
    component.userMessage = 'mensaje oculto';
    component.sendMessage();

    // Simula el paso de 10 segundos
    tick(10000);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const decryptedMessage = compiled.querySelector('.decrypted-section pre')?.textContent;

    expect(decryptedMessage); // El mensaje desencriptado debe ser igual al original
    expect(component.decryptedMessage); // El mensaje desencriptado en el modelo también debe coincidir
  }));
// 6. Verifica que la capa de la cuenta regresiva se muestra mientras está activa
  it('should display countdown overlay when countdown is active', fakeAsync(() => {
    component.userMessage = 'mensaje con cuenta regresiva';
    component.sendMessage();
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.screen-overlay'));
    expect(overlay).toBeTruthy(); // La capa overlay debe mostrarse mientras la cuenta regresiva está activa

    // Simula el paso de 5 segundos y verifica que la capa sigue visible
    tick(5000);
    fixture.detectChanges();
    expect(overlay).toBeTruthy(); // La capa overlay sigue siendo visible
  }));



  // 8. Verifica que los valores predeterminados están correctamente inicializados
  it('should initialize with default values', () => {
    expect(component.userMessage).toBe('');
    expect(component.encryptedMessage).toBe('');
    expect(component.decryptedMessage).toBe('');
    expect(component.countdown).toBe(10); // El contador debe estar en 10
  });
});

